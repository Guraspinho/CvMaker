const object = {
  visibility: {
    photo: true,
    summary: true,
    workExperience: true,
    education: true,
    certifications: true,
    color: "blue",
  },
  photoURL: "https://via.placeholder.com/100",
  personalDetails: {
    name: "John Doe",
    address: "123 Main St, City, Country",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    website: "https://linkedin.com/in/johndoe",
  },
  summary: "Experienced professional with expertise in web development.",
  workExperience: [
    {
      jobTitle: "Software Developer",
      startDate: "Jan 2020",
      jobDescription: [{ descriptionText: "Developed web applications." }],
    },
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science",
      startDate: "2015-2019",
      school: "ABC University",
      degreeDescription: [{ descriptionText: "Graduated with honors." }],
    },
    {
      degree: "B.Sc. in Computer Science",
      startDate: "2015-2019",
      school: "ABC University",
      degreeDescription: [{ descriptionText: "Graduated with honors." }],
    },
  ],
  skills: ["JavaScript", "React", "CSS"],
  languages: ["English", "Spanish"],
  certifications: [
    { name: "Certified JavaScript Developer", organization: "XYZ" },
  ],
};

// Set personal details
if (object.visibility.photo) {
  document.getElementById("user-img-wrapper").style.display = "block";
  document.getElementById("user-img").src = object.photoURL;
} else {
  document.getElementById("user-img-wrapper").style.display = "none";
}
document.getElementById("full-name").textContent = object.personalDetails.name;
document.getElementById("address").textContent = object.personalDetails.address;
document.getElementById("phone").textContent = object.personalDetails.phone;
document.getElementById("email").textContent = object.personalDetails.email;
document.getElementById("website").href = object.personalDetails.website;
document.getElementById("website").textContent = object.personalDetails.website;

// Set summary
if (object.visibility.summary) {
  const summarySection = document.getElementById("summary-section");
  summarySection.innerHTML = `
      <div class="Res1_summary">
        <div class="Res1_section_header" style="color: ${object.visibility.color}">
          <h2>Summary</h2>
          <hr style="background: ${object.visibility.color}">
        </div>
        <p class="Res1_summary">${object.summary}</p>
      </div>
    `;
}

// Set work experience
if (object.visibility.workExperience) {
  const workExperienceSection = document.getElementById(
    "work-experience-section"
  );
  let workExperienceHTML = `
      <div class="Res1_work">
        <div class="Res1_section_header" style="color: ${object.visibility.color}">
          <h2>Work Experience</h2>
          <hr style="background: ${object.visibility.color}">
        </div>
        <div class="Res1_work_tab">
    `;
  object.workExperience.forEach((item) => {
    workExperienceHTML += `
        <div class="Res1_work_item">
          <div class="Res1_section_subtitle">
            <p class="Res1_preview_work_title">${item.jobTitle}</p>
            <div class="Res1_data_picker">
              <p class="Res1_preview_work_title">${item.startDate}</p>
            </div>
          </div>
          <div class="Res1_work_list">
      `;
    item.jobDescription.forEach((nestedItem) => {
      workExperienceHTML += `
          <span>
            <p class="Res1_preview_work_sub">${nestedItem.descriptionText}</p>
          </span>
        `;
    });
    workExperienceHTML += `</div></div>`;
  });
  workExperienceHTML += `</div></div>`;
  workExperienceSection.innerHTML = workExperienceHTML;
}

// Set education
if (object.visibility.education) {
  const educationSection = document.getElementById("education-section");
  let educationHTML = `
      <div class="Res1_education">
        <div class="Res1_section_header" style="color: ${object.visibility.color}">
          <h2>Education</h2>
          <hr style="background: ${object.visibility.color}">
        </div>
    `;
  object.education.forEach((item) => {
    educationHTML += `
        <div class="Res1_work_item">
          <div class="Res1_section_subtitle">
            <p class="Res1_preview_work_title">${item.degree}</p>
            <p class="Res1_preview_work_title">${item.startDate}</p>
          </div>
          <p class="Res1_preview_edu_sub">${item.school}</p>
          <div class="Res1_work_list">
      `;
    item.degreeDescription.forEach((nestedItem) => {
      educationHTML += `
          <span>
            <p class="Res1_preview_work_sub">${nestedItem.descriptionText}</p>
          </span>
        `;
    });
    educationHTML += `</div></div>`;
  });
  educationHTML += `</div>`;
  educationSection.innerHTML = educationHTML;
}

// Set additional information
if (object.visibility.certifications) {
  const additionalInfoSection = document.getElementById(
    "additional-info-section"
  );
  let additionalInfoHTML = `
      <div class="Res1_additional">
        <div class="Res1_section_header" style="color: ${object.visibility.color}">
          <h2>Additional Information</h2>
          <hr style="background: ${object.visibility.color}">
        </div>
    `;
  additionalInfoHTML += `<div class="Res1_additional_single">
      <span><b class="Res1_additional_single_b">Technical skills:</b><p class="Res1_additionals">${object.skills.join(
        ", "
      )}</p></span>
    </div>`;
  additionalInfoHTML += `<div class="Res1_additional_single">
      <span><b>Languages:</b><p class="Res1_additionals">${object.languages.join(
        ", "
      )}</p></span>
    </div>`;
  additionalInfoHTML += `<div class="Res1_additional_single">
      <span><b>Certifications:</b><p class="Res1_additionals">${object.certifications
        .map((cert) => cert.name)
        .join(", ")}</p></span>
    </div>`;
  additionalInfoHTML += `<div class="Res1_additional_single">
      <span><b>Awards/Activities:</b><p class="Res1_additionals">${object.certifications
        .map((cert) => cert.organization)
        .join(", ")}</p></span>
    </div>`;
  additionalInfoHTML += `</div>`;
  additionalInfoSection.innerHTML = additionalInfoHTML;
}
