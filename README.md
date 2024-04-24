# About the App
- This project is a progressive web app (PWA) App using IndexDb to store the to-do list items. 
- Service worker is used to enable offline capabilities and resource caching.

## Assumptions
1. The list is sorted with these priorities:
- The earliest added items are at the top.
- Incomplete items will be followed by completed ones.
- Items with a "star" are given extra importance.
2. "star" marking will be cancelled once an item is completed.
3. Deleted items cannot be recovered.

## Key Features
1. Prioritize (Star) the item
2. Mark the item as 'Completed'
3. Delete the item

## Running the Application

### Pre-requisites
Ensure you have Node.js installed on your system to manage packages and run the development server.

### Installation
1. Clone this repository or download the source code.
2. Run `npm install`

### Build the app
Build the app using `npm run build`

### Launch the app
Navigate to the build directory, run `npx http-server`
