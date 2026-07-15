A list of things I still need to do or features I want to add

## Completed
[x] Make links in the header section of the resume use their labels as text instead of sticking a raw link there
[x] Disable the continue button until a template has been selected
[x] Add the ability to add multiple links
[x] Move from using seperate fields from country, state to a single location field
[x] Think about the trade-offs for implementing the skills map as an array or as a hashmap
[x] Reshape the template data type
[x] Work on responsivness ( bruh )
[x] Make the sidebar hideable on smaller desktop screens
[x] Look into replacing the complex state manipulation logic on the resumeData with a reducer
[x] I would like to move the components that support the main form in the skills-form, experience-form into their own componenets but I'm not really sure how I'd name the files and how it fits into my fs
[x] Prevent the live preview from flashing on every text input ( how I am going to do this without having some sort of global debounce only God knows, I really wish react-pdf had a way of smoothly handling dynamic data )
[x] Change the font on the template-1
[x] Setup template selection and then using that template on the preview page, think about how I want to store the selected template -> context + local storage or using url params
[x] Fix the animation on sidebar open it's the "resume section" currently jerks into position

## In Progress
[] Add Aria-labels to buttons for accessibility
[] Consider moving the resume data into a context.
[] Make sections arrangeable, some people might not like the exact flow of the templates
[] Add loading state for when the resume data is being fetched ( after I've added online support )
