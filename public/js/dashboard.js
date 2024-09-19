document.addEventListener("DOMContentLoaded", async () => {
  const user = localStorage.getItem("user");
  console.log(user);
  if (!user) {
    window.location.href = "/login.html";
    return;
  } else {
    console.log("jdj");
  }

  try {
    const response = await fetch("/questionnaire/list");
    if (response.ok) {
      const questionnaires = await response.json();
      const questionnaireList = document.getElementById("questionnaireList");
      questionnaires.forEach((questionnaire) => {
        const card = document.createElement("div");
        card.className =
          "bg-white p-4 rounded-lg shadow h-[146px] flex flex-col justify-between sm:h-auto relative";
        card.innerHTML = `
          <h3 class="text-lg font-semibold">${questionnaire.title}</h3>
          <p class="text-sm text-gray-600">Created by: ${
            questionnaire.creator.firstName
          } ${questionnaire.creator.lastName} (${
          questionnaire.creator.position
        })</p>
          <p class="text-sm text-gray-500">Created on: ${new Date(
            questionnaire.createdAt
          ).toLocaleDateString()}</p>
          <div class="flex items-center justify-between mt-2">
            <a href="/view-questionnaire.html?id=${
              questionnaire._id
            }" class="inline-block text-blue-500 hover:underline">View Questionnaire</a>
        
          </div>
        `;
        questionnaireList.appendChild(card);
      });

      document.querySelectorAll(".share-btn").forEach((btn) => {
        btn.addEventListener("click", () =>
          showShareModal(btn.dataset.id, btn.dataset.link)
        );
        btn.addEventListener("mouseenter", () => {
          btn.nextElementSibling.classList.remove("opacity-0", "invisible");
        });
        btn.addEventListener("mouseleave", () => {
          btn.nextElementSibling.classList.add("opacity-0", "invisible");
        });
      });
    } else if (response.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login.html";
      const errorData = await response.json();
      alert(errorData.message || "Failed to fetch questionnaires");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
});

function showShareModal(id, shareableLink) {
  const shareUrl = `${window.location.origin}/view-questionnaire.html?id=${id}&link=${shareableLink}`;
  navigator.clipboard
    .writeText(shareUrl)
    .then(() => {
      alert("Share link copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      alert("Failed to copy share link. Please try again.");
    });
}
