GitHub Profile Explorer
A streamlined tool designed for recruiters to quickly search and preview GitHub profiles using a candidate's username.

**Features
*Search Functionality: Enter a GitHub username to fetch user information and repositories.
*Display Candidate Info: Show avatar, name, username, location, bio, follower/following counts, and a link to the GitHub profile.
*Repository List: Display repository name (linked to GitHub), description, star count, fork count, and primary language.
*Sorting Options: Sort repositories by stars, name, or most recent.
*Error Handling: Display a message if the user is not found (handle 404 error).
*Responsive Layout: Ensure the application is responsive across devices.

**Installation
Clone the repository:
git clone https://github.com/yourusername/github-profile-explorer.git
Navigate to the project directory:
cd github-profile-explorer

**Install dependencies:
npm install

**Run the application:
npm run dev

**Usage
Open the application in your browser.
Enter a GitHub username in the search field.
Click the search button to fetch and display the user's profile and repositories.

**API Endpoints Used
User Information: https://api.github.com/users/[username]
User Repositories: https://api.github.com/users/[username]/repos

