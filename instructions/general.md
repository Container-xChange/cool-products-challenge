The coding exercise will be divided in 4 different tasks, each one done in sequence. Before each task it will be provided a project template, which you'll need to import into you IDE in order to start coding. Don't worry if you can't finish one task before moving to the next one, because these templates will have everything you need to do every task.

The code provided in each template is incomplete and won't compile. For that you'll need to fill in the gaps with proper code. Apart from that you'll need to add code to fulfill each requirement requested in the respective task you're in. Check out for the TODO comments, they will help you understand what and where should you make the changes.

The project structure is consistent across all the tasks:
- It is created with the good practices described in the [Angular Coding Style Guide](https://angular.io/guide/styleguide#angular-coding-style-guide)
- It follows the Single Angular Component Module, or SCAM for short, which is the concept of creating Angular Modules with only one component (or directive / pipe).
- It follows the BEM (Blocks, Elements and Modifiers) methodology as the styling structure.
- It uses dedicated routing modules to specify the application' routes (which are loaded lazily).
- It has the following structure:
- **app**
  - **core** _contains all the core elements of the application_
    - **injectors** _contains the custom injectors_
    - **interfaces** _contains the model definitions_
    - **mappers** _contains helpers to map data between models_
    - **services** _contains all the core services of the application_
  - **directives** _contains the custom directives_
  - **modules** _contains the application components_
  - **pages** _contains the components that define routes in the application_
  - **styles** _contains some style definitions and design tokens_
  - **test** _contains helpers for testing_
    - **mocks** _contains mock definitions for testing models_
    - **utils** _contains utility functions for testing purpose_
- **assets** _contains all the assets used in the application_ 
- **environments** _contains the environment variable definition per build type_
