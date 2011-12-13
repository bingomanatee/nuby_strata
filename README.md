Nuby_Strata is an attempt to extend my earlier javascript framework into the Strata framework.

Also, it is an attempt to use BDD to develop the framework, in that when I converted my earlier
framework to Node v. 0.6.x it exploded without my having any way of introspecting what was or was
not working.

# Project Goals

The goals of Nuby_Strata are:

1. Has a loader that loads actions and controllers from one or more app directories that deliver the
    below behaviors. Controllers have "Loader types" -- so far, the only types are "default" and "rest",
    but you can create a custom loader that interprets applications in any manner you like.
2. Create an action centric folder structure, wherein a majority the custom resources
    required for an action are contained either in the action folder,
    or in the controller folder, as opposed to organizing items by their type (view, controller, model)
    which I find unhelpful.
3. Create "Flow templates" - scaffolding -- that has hooks that allow you to only customize the
    part of the action flow that deviates from the norm.
4. Allow for "Run and gun" REST.
5. Create standards for fully integrated auth, user and i18n filters and routing.

# Action Flow

The archetype flow of an action is:

1. extract params from request (throw error)
2. check permissions for action access through action hook `can` (throw error)
3. interact with model through action hook `data` (throw error) - can be input, retrieval, editing, deletion, etc.
4. render response through action hook `render` (throw error) - may also set headers.
5. optionally encase content with layout though action hook `layout`
6. pass result of rendering through strata callback app_callback

These action hooks can be easily delegated to methods of the same names in their governing controller.
Said methods when delegated include the action as a parameter to allow discrimination in the controller
based on the action.

Why dessicate the action flow so thoroughly?

  * Most actions have the same basic flow - but in writing implementation, you are forced to write the same
    code over and over.
  * Steps like auth are important to highlight and discriminate; but again, the response code to failed
    ACL checks is mundane and writing the forking code is forking tiresome.

these hooks all have default implementations in the Action class which can be overwritten upon
Action instantiation.

All of this takes place through a passthrough function called a "Handler".
Handle functions are created by an action hook `handle`. Handle hooks encapsulate the above flow
and are used as callbacks to app.Binder's routing. The route path is determined either by the actions'
`get_route` hook, or by default, thorugh `/[controller_name]/[action_name].:format?`, with variations
as per REST conventions.

All of this complexity and granularity suits my style - however the only absolute requirement of the handle
hook is that it passes (code, {headers}, output) to its callback or forwards to another path.

# Appliction Components

## Context

The context is a container that holds everything the application requires:

  * The app -- the resource that responds to requests
  * The controller -- the resource that holds shared routines for a suite of actions
  * Models
  * Any shared state registries

All actions, controllers and models refer back to the context. 

## Actions 
Actions are where the "action" is. They contain all the callbacks and are incredibly extensible for custom flow. 
For the most part, most requests should be handled by one or two actions (generally two in the case of one action for
"work" and the other action for "summary" display. 
## Action::handle

Actions have a handle method that returns a callback that gets inserted into the app in tandem with a route. 
This callback meets the profile of a strata handler, but is a gateway to the larger digestive system of the action class. 
That being said -- actions are completely under designer control, and while the default action has an involved digetive tract,
a custom action can have architecture particular to its needs and does not HAVE to inherit from the Action class. 

note - the handle method _is not itself a callback_. It *returns* a callback in order 
to establish association back to the action through closures.

## Controllers
Controllers are very thin in nuby_strata. Every function that an action can complete -- data handling, layout, 
authentication -- is by default handled by the actions themselves and only optionally delegated in cases where 
shared solutions across a series of acitons is useful. They are by convention associated with a single model, but
that is up to the developer to decide; the data method can contain any number of model interactions, and that
is up to the app designer to determine.

# The Callback Maze

The callbacks can be a bit confusing - partly because they are "nonimus" named functions, and partly because there are a
lot of them.

The most important callback is the "app_callback" == the strata app. it has a signature
  function(status: int, headers: object, body: string | stream)

The other methods in action call each other and have callbacks specifically designed to recieve their output.

## adapting callbacks

There are a lot of functions in tha action pipeline that are NOT designed to pass along env and the
strata callback. Params, for instance is designed to just return the parameters from the environment.

To maintain state, these "extraction functions" are passed a callback that DOES track state, adapting
them to the action flow.

For instance, _on_params -- the action method -- expects (err, params, env, app_callback);
Howver strata.request.params passes to its callback (err, params).

So we prepare an adapting callback __in the body handle__ (before we call req.params)
to pass along to req.params that adds the state parameters
to its output and returns all of this to the next call, thanks to closure.

  function _on_params(err, params){
    action._on_params(err, params, env, app_callback)
  }

Creating an adaptive callback not only ensures that we pass along context information,
it also __passes along the action object itself, as "this"__.

Most methods - render, data, params, etc. have a matching named callback
_on_[name]. The _on_name callback has a custom profile. To keep state,
before it is passed in as a callback, it is encased in a local function to
maintain context.

`app_callback(code, headers, content)` is defined by the strata routing api.

  * code is a response code; 200 == ok, etc.
  * headers are key/value pairs.
  * content is the response value - generally an HTML web page,
    or a JSON or XML string block. A stream/buffer can also be passed.

## _handle(env, app_callback)

**request handler** _handle is inserted into the routing mechanism of strata (by handle()) and is the
initial recipient of environmental data. It encapsulates all the activity below.

It starts the chain of response by harvesting parameters via strata.Request.params(_on_params)

## [strata.Request.params(_on_params(err, params)) **parser**

Note that the Request object has access to env as it is passed in on instantiation.

### _on_params(err, params, env, app_callback)

**env parser** adds params to env._request_params and calls action.can(env, _on_can, _on_block). note that the _on_params
that is bundled with the default action merges the route parameters in with the request parameters.

## action.can(test, yes_callback(), no_callback())

**auth router** Note this is a general auth utility method that can be used for any auth checking action.
it is intially called to see if you are authorized to access the action with the parameter test = 'respond'
These two local handlers route to action.data and action.error respectively.

note that the callbacks have no parameters - they are simply called - so they have to contain
all the passalongs (env, app_callback) through closure.

## action.data (env, _on_data_callback(err, data))

**data gateway** This is the "Work part" of the action  - any data retrieval, alteration, input, etc. are done here.
_on_data has the profile (err, data) -- what data is is application dependant. The default _on_data
that is a method of action attaches the data to env._data.

The _on_data_callback is created inside the yes_callback; the _on_data callback
bundled with the action class routes to either _format or render.

## _format (env, format, app_callback)

**router/rendererer** _format is a switch that routes data to a rendering solution. It is designed initially for
REST and other processes that output straight data (XML, or other non-HTML formats.)
note that HTM/HTML formmatting is equivalent to rendering stright out through render.

## render (env, on_render(err, content))

** renderer** render is designed to produce a content (string) block.
it is the on_render handler's responsibility to pass this on to the app callback. Note that this is
the last change for normal (HTML) pages but is skipped for raw (file, JSON, REST) content.





