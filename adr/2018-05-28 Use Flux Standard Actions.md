# Title
Use Flux Standard Actions formatting for actions

# Status
Accepted

# Context
In setting up a new application with a new language and framework, it's wise to follow some standards.
Building actions to return objects which are predictable in format can make programming more clear.

For some clarity, from the [Flux Standard Action repo](https://github.com/redux-utilities/flux-standard-action):

> An action MUST 
> - be a plain JavaScript object.
> - have a type property.
>
> An action MAY
> - have an error property.
> - have a payload property.
> - have a meta property.
>
> An action MUST NOT include properties other than type, payload, error, and meta.

# Decision
In rebooting the start of this project, we will take this opportunity to reformat all the actions to
return standard action formats. 

# Consequences
Refactoring