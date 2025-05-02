## Project Approach & Challenges (Pokémon React App)

Overview:
In this project, I built a Pokémon browser using React.js, integrating data from the PokeAPI. The application allows users to:
Browse paginated Pokémon cards
Search and filter Pokémon
View detailed stats, abilities, and evolution chains on a dedicated detail page
I used React Context API for global state management and Tailwind CSS for UI styling.

## Approach & Structure

Data Fetching & State Management:
I created a central context (PokemonContext) that fetches and stores data for all 150 Pokémon using PokeAPI.
Each Pokémon includes its types, stats, abilities, and evolution chain, which I pre-processed inside the context to avoid excessive API calls later.
Pagination logic is managed inside the context to allow global control over the displayed list.

## Component Structure:

I built reusable components like Header, PokemonCard, and PaginationControls.
The Detail page (DetailPage.jsx) uses dynamic routing to fetch and display full details, including stats, abilities, and evolution chains.

Routing:
I used React Router to manage navigation between the main list and individual Pokémon detail pages (/detail/:pokemonId).

## UI/UX:
Tailwind CSS was used for responsive design.
Loading spinners and error boundaries ensure smoother user experience.

## Challenges & Solutions

Pagination vs. Search/Filter Conflict:
Challenge: By default, the app paginates Pokémon. But during search/filter, users expected all matching results at once (without pagination).
Solution: I adjusted the logic so that pagination only applies in the "default" view. When search or filter is active, the app bypasses pagination and displays all matching results.

Evolution Chain API Complexity:
Challenge: PokeAPI structures evolution data in a nested and recursive format (species ➔ evolution chain ➔ chain links). This made it tricky to fetch and flatten the chain.
Solution: I used a recursive function inside my context to parse the evolution chain and store it as a simple array of names like [Bulbasaur ➔ Ivysaur ➔ Venusaur].

Default Pagination Breaking After Search:
Challenge: After implementing the search-filter behavior, the default pagination stopped advancing pages correctly.
Solution: I refactored the pagination to ensure that the current page and sliced data reset correctly after every search or filter reset. I also made sure the page state resets to page 1 when exiting search.

Optimizing API Calls:
Challenge: PokeAPI requires separate calls for species and evolution data, leading to performance hits.
Solution: I fetched and cached all 150 Pokémon's abilities and evolutions upfront inside the context. This reduced API load during user interaction and made the app snappy.


## Tech Stack Used:
React.js
React Router
React Context API
Tailwind CSS
PokeAPI (public REST API)
