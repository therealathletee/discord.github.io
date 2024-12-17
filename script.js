document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://discord.com/api/guilds/1238024033463697438/widget.json";
    const membersList = document.getElementById("members-list");

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to fetch data.");
            }
            return response.json();
        })
        .then(data => {
            membersList.innerHTML = ""; // Clear loading state

            // Check if members exist
            if (data.members && data.members.length > 0) {
                data.members.forEach(member => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <span>${member.username}</span>
                        <span style="color: ${member.status === 'online' ? '#b2ff9e' : '#ff9e9e'};">
                            ${member.status.toUpperCase()}
                        </span>
                    `;
                    membersList.appendChild(li);
                });
            } else {
                membersList.innerHTML = "<li>No members online currently 💔</li>";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            membersList.innerHTML = "<li>Failed to load members 😢</li>";
        });
});
