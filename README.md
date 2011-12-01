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