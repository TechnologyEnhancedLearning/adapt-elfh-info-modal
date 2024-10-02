# Information modal

An extension to add a button to the nav bar that when clicked displays a modal with textual content populated by the course creator.

## Installation

- Add the [example JSON](example.json) to `course.json`.
- With [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run `adapt install info-modal`. Alternatively, [download the ZIP](https://github.com/TechnologyEnhancedLearning/adapt-elfh-info-modal) and extract into the src > extensions directory.
- Run an appropriate Grunt task.

## Usage

- An icon button can be added to the navigation bar.
- When the learner clicks the icon button, a [Notify](https://github.com/adaptlearning/adapt_framework/wiki/Core-modules#notify) prompt can be shown that displays content populated by the course creator.

## Attributes

### `_isEnabled` (boolean):

Enables/disables this extension. The default value is `true`. Set this to `true` to enable this extension.

### `_button` (object):

Contains the following settings:

- `_isEnabled` (boolean):
  Controls whether an icon button should be added to the top navigation bar or not. The default value is `true`.

  - `navigationAriaLabel` (string):
  Sets the navigation button aria label. The default value is `Navigation button alt text`.

  - `_iconType` (string):
  Sets the navigation button icon. There is a choice of 3 options, "accessibility", "info" and "help". The default value is `accessibility`.

- `_notifyPrompt` (object):
  Contains the following settings:   

      * `title` (string):

  Title of the modal prompt e.g. "Accessibility statement"

      * `body` (string):

  Body text of the modal prompt e.g. the content could be an accessibility statement

 ![image](https://github.com/user-attachments/assets/5b45390e-f23c-475f-aa86-7dd820d6934e)

 ![image](https://github.com/user-attachments/assets/b85a8edc-3613-4068-b3a4-1950fb4df644)



  

