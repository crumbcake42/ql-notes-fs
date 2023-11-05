# Quilt Labs - Notes Filesystem App Challenge

## Running the code

1. If you don’t have it please install [node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Run `npm install` in the project directory.
3. Run `npm run dev` in the project directory.
4. The app should now be running on `localhost:3030` so put that into your web browser and try it out.

## Provided code

**Items**

An **Item** can be either a **Note** or a **Directory**. A **Note** is a leaf node in the filesystem and contains a string of text. A **Directory** is a node in the filesystem that can contain other **Items**. The root of the filesystem is a **Directory**.

Schema:

| **Field** | **Type**              | **Description**                                                                                     |
| --------- | --------------------- | --------------------------------------------------------------------------------------------------- |
| type      | ‘note’ \| ‘directory’ | Defines whether an Item is a Note or Directory.                                                     |
| name      | string                | The name associated with the Item.                                                                  |
| parent    | Item \| undefined     | A reference to the parent of this Item. undefined for the `root` directory.                         |
| note      | string \| undefined   | The actual notes text that the user can set for `Note` items. undefined when `type == ‘directory’`. |
| items     | Item[] \| undefined   | The items in this directory if the item is a `Directory`. undefined when `type == ‘note’`.          |

This is defined in `app/components/types.ts`.

**Components**

- `ReactApp (app/components/reactApp.tsx)` - The main component that renders the app.
- `Workspace (app/components/workspace.tsx)` - The component that renders the filesystem.
  - This component provides a `React.Context` through which child components can filesystem methods and state.
- `ItemView (app/components/workspace.tsx)` - The component which renders an individual Item.
  - This component is checks the type and renders the correct component for the Item type (Note or Directory).
- `noteView (app/components/noteView.tsx)` - The component which renders a Note.
- `directoryView (app/components/directoryView.tsx)` - The component which renders a Directory.

**React Context**

The `Workspace` component provides a `React.Context` through which child components can filesystem methods and state. This is defined in `app/components/workspace.tsx`.

| **Field**      | **Type**     | **Description**                                                                            |
| -------------- | ------------ | ------------------------------------------------------------------------------------------ |
| currentItem    | Item \| null | The current item rendered in the `Workspace`.                                              |
| setCurrentItem | Function     | Sets the current item to a different item.                                                 |
| addNote        | Function     | Creates a new note given a `fileName` and `noteText`, if the `currentItem` is a directory. |
| addDirectory   | Function     | Creates a new directory given a `newDirName`, if the `currentItem` is a directory.         |
| updateNote     | Function     | Updates the `note` text of the `currentItem`, if it is a note.                             |

**Questions**

If there are any questions or issues about the starter code, please reach out to `support@quiltlabs.ai` and we will respond ASAP. Good luck!

## Mickey's notes

### Initial setup

Installed NextUI component library to speek up prototyping. I chose it because it had several components to served the scope of this task nicely and I liked the look of them.

That said, if I was actually planning anything for production, I would definitely do more research regarding performance, bundle size, and maintainability.

### Restructuring directories

I restructured the project structure to be in line with the one outlined [here](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md). In the past I found myself following my gut when deciding how to organize things, but I soon realized my gut was unreliable. When I came across this repo I decided to adopt its conventions to keep everything neat and consistent.

This meant everything related to the filesystem workspace was moved into its own `notes-fs` directory. I broke apart the pieces from the original `workspace` file into more granular ones to separate the Context and components code.

### Feature buildout

I used the NextUI `Table` component to display the directory items in `DirectoryView`.

- The items are sortable by `type` and `name`.

Clicking on the checkbox will let you multiselect as many items as you want.

- If no items are selected, the `Delete Selected` button is disabled
- Otherwise clicking it will open a modal previewing how many items will be deleted and asking you to confirm

You can rename and delete items from the `DirectoryView` with the buttons in the `Actions` column of the table.

- Clicking on the edit icon will open a modal for you to enter a new name for the item selected. The new name has to be unique among other items in the directory
- Clicking the delete icon will trigger the same result as if you selected the row and clicked `Delete Selected`

You can navigate into a Directory of Note by clicking on any other part of the item's table row

- The `Breadcrumbs` component will always update to show your current path
- Clicking `Previous Directory` will take you up one level (unless you're in the root directory), or you can navigate further by clicking on any Breadcrumb segment

Clicking into a note will display the Note in `NoteView`

I tried to make it a bit more legible by adding Edit buttons to both the note text and name, in case the user doesn't realize immediately that they can edit both by clicking on the text itself.

- When editing the title, pressing `esc` is the same as clicking "Cancel", and pressing `Enter` is the same as clicking "Submit"
- The `esc` key does the same when editing note text, but the Enter button just adds a line break.

### Debug helper

If you run this project with `NEXT_PUBLIC_DEBUG_NOTES_FS = true` in your `.env.local` file, an additional row of buttons appears on `DirectoryView`.

- `Generate Note` will generate a new note in the current directory with an arbitrary name and content
- `Generate Directory` will generate a new empty directory with a random name

This just makes it easier to populate things so you don't need to type in dummy values when trying to fill directories.

### Final thoughts

While I'm happy with the final result I'm submitting, the one part of this project that I wish I had been able to get finished was a way to persist the data of the filesystem. I started playing around with AWS's dynamoDB SDK, figuring I had three days and how long could it take (note: I've never worked with a NoSQL db)? It didn't work out, but I learned a valuable lesson about hubris all the same.

In retrospect, my actual regret for that wasted time is that I could've gotten in some ways to cases where directories have large numbers of child items (adding either pagination or async loading, for example).

I look forward to hearing back from you. Regardless your final decision, any constructive feedback would be greatly appreciated.

Best,
Mickey
