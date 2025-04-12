document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const locationInput = document.getElementById('location');
    const skillsInput = document.getElementById('skills');
    const addWorkBtn = document.getElementById('addWork');
    const addEducationBtn = document.getElementById('addEducation');
    const generatePDFBtn = document.getElementById('generatePDF');
    const saveResumeBtn = document.getElementById('saveResume');

    // Preview elements
    const previewName = document.getElementById('previewName');
    const previewEmail = document.getElementById('previewEmail');
    const previewPhone = document.getElementById('previewPhone');
    const previewLocation = document.getElementById('previewLocation');
    const previewWork = document.getElementById('previewWork');
    const previewEducation = document.getElementById('previewEducation');
    const previewSkills = document.getElementById('previewSkills');

    // Update personal information in real-time
    fullNameInput.addEventListener('input', () => {
        previewName.textContent = fullNameInput.value || 'Your Name';
    });

    emailInput.addEventListener('input', () => {
        previewEmail.innerHTML = `<i class="fas fa-envelope mr-2"></i>${emailInput.value || 'email@example.com'}`;
    });

    phoneInput.addEventListener('input', () => {
        previewPhone.innerHTML = `<i class="fas fa-phone mr-2"></i>${phoneInput.value || 'Phone Number'}`;
    });

    locationInput.addEventListener('input', () => {
        previewLocation.innerHTML = `<i class="fas fa-map-marker-alt mr-2"></i>${locationInput.value || 'Location'}`;
    });

    // Update skills in real-time
    skillsInput.addEventListener('input', () => {
        const skills = skillsInput.value.split(',').map(skill => skill.trim()).filter(skill => skill);
        previewSkills.innerHTML = skills.map(skill => 
            `<span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">${skill}</span>`
        ).join('');
    });

    // Add work experience entry
    addWorkBtn.addEventListener('click', () => {
        const workEntry = document.createElement('div');
        workEntry.className = 'work-entry bg-black/50 p-4 rounded-lg';
        workEntry.innerHTML = `
            <div class="space-y-4">
                <div class="flex justify-between items-start">
                    <div class="flex-grow">
                        <label class="block text-sm font-medium mb-2">Company Name</label>
                        <input type="text" class="company-name w-full bg-black border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-accent">
                    </div>
                    <button class="delete-entry text-red-500 hover:text-red-400 ml-4">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Position</label>
                    <input type="text" class="position w-full bg-black border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-accent">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Start Date</label>
                        <input type="month" class="start-date w-full bg-black border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-accent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">End Date</label>
                        <input type="month" class="end-date w-full bg-black border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-accent">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Description</label>
                    <textarea class="description w-full bg-black border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-accent" rows="3"></textarea>
                </div>
            </div>
        `;
        document.getElementById('workExperience').appendChild(workEntry);
        setupWorkExperienceListeners(workEntry);
    });

    // Add education entry
    addEducationBtn.addEventListener('click', () => {
        const educationEntry = document.createElement('div');
        educationEntry.className = 'education-entry bg-black/50 p-4 rounded-lg';
        educationEntry.innerHTML = `
            <div class="space-y-4">
                <div class="flex justify-between items-start">
                    <div class="flex-grow">
                        <label class="block text-sm font-medium mb-2">School/University</label>
                        <input type="text" class="school-name w-full bg-black border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-accent">
                    </div>
                    <button class="delete-entry text-red-500 hover:text-red-400 ml-4">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Degree</label>
                    <input type="text" class="degree w-full bg-black border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-accent">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Start Date</label>
                        <input type="month" class="edu-start-date w-full bg-black border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-accent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">End Date</label>
                        <input type="month" class="edu-end-date w-full bg-black border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-accent">
                    </div>
                </div>
            </div>
        `;
        document.getElementById('education').appendChild(educationEntry);
        setupEducationListeners(educationEntry);
    });

    // Setup work experience listeners
    function setupWorkExperienceListeners(entry) {
        const inputs = entry.querySelectorAll('input, textarea');
        const deleteBtn = entry.querySelector('.delete-entry');

        inputs.forEach(input => {
            input.addEventListener('input', updateWorkPreview);
        });

        deleteBtn.addEventListener('click', () => {
            entry.remove();
            updateWorkPreview();
        });
    }

    // Setup education listeners
    function setupEducationListeners(entry) {
        const inputs = entry.querySelectorAll('input');
        const deleteBtn = entry.querySelector('.delete-entry');

        inputs.forEach(input => {
            input.addEventListener('input', updateEducationPreview);
        });

        deleteBtn.addEventListener('click', () => {
            entry.remove();
            updateEducationPreview();
        });
    }

    // Update work experience preview
    function updateWorkPreview() {
        const workEntries = document.querySelectorAll('.work-entry');
        previewWork.innerHTML = '';

        workEntries.forEach(entry => {
            const company = entry.querySelector('.company-name').value;
            const position = entry.querySelector('.position').value;
            const startDate = entry.querySelector('.start-date').value;
            const endDate = entry.querySelector('.end-date').value;
            const description = entry.querySelector('.description').value;

            if (company || position) {
                const workPreviewEntry = document.createElement('div');
                workPreviewEntry.className = 'mb-4';
                workPreviewEntry.innerHTML = `
                    <div class="flex justify-between items-start">
                        <h3 class="font-semibold">${company || 'Company Name'}</h3>
                        <span class="text-sm text-gray-600">
                            ${startDate ? new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Start Date'} - 
                            ${endDate ? new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                        </span>
                    </div>
                    <p class="text-gray-800">${position || 'Position'}</p>
                    <p class="text-sm text-gray-600 mt-2">${description || ''}</p>
                `;
                previewWork.appendChild(workPreviewEntry);
            }
        });
    }

    // Update education preview
    function updateEducationPreview() {
        const educationEntries = document.querySelectorAll('.education-entry');
        previewEducation.innerHTML = '';

        educationEntries.forEach(entry => {
            const school = entry.querySelector('.school-name').value;
            const degree = entry.querySelector('.degree').value;
            const startDate = entry.querySelector('.edu-start-date').value;
            const endDate = entry.querySelector('.edu-end-date').value;

            if (school || degree) {
                const educationPreviewEntry = document.createElement('div');
                educationPreviewEntry.className = 'mb-4';
                educationPreviewEntry.innerHTML = `
                    <div class="flex justify-between items-start">
                        <h3 class="font-semibold">${school || 'School/University'}</h3>
                        <span class="text-sm text-gray-600">
                            ${startDate ? new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Start Date'} - 
                            ${endDate ? new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                        </span>
                    </div>
                    <p class="text-gray-800">${degree || 'Degree'}</p>
                `;
                previewEducation.appendChild(educationPreviewEntry);
            }
        });
    }

    // Generate PDF
    generatePDFBtn.addEventListener('click', () => {
        const element = document.getElementById('resumePreview');
        const opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Generate PDF
        html2pdf().set(opt).from(element).save();
    });

    // Save resume draft
    saveResumeBtn.addEventListener('click', () => {
        const resumeData = {
            personalInfo: {
                fullName: fullNameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                location: locationInput.value
            },
            skills: skillsInput.value,
            workExperience: Array.from(document.querySelectorAll('.work-entry')).map(entry => ({
                company: entry.querySelector('.company-name').value,
                position: entry.querySelector('.position').value,
                startDate: entry.querySelector('.start-date').value,
                endDate: entry.querySelector('.end-date').value,
                description: entry.querySelector('.description').value
            })),
            education: Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
                school: entry.querySelector('.school-name').value,
                degree: entry.querySelector('.degree').value,
                startDate: entry.querySelector('.edu-start-date').value,
                endDate: entry.querySelector('.edu-end-date').value
            }))
        };

        localStorage.setItem('resumeDraft', JSON.stringify(resumeData));
        alert('Resume draft saved successfully!');
    });

    // Load saved draft
    const savedDraft = localStorage.getItem('resumeDraft');
    if (savedDraft) {
        const resumeData = JSON.parse(savedDraft);
        
        // Load personal info
        fullNameInput.value = resumeData.personalInfo.fullName || '';
        emailInput.value = resumeData.personalInfo.email || '';
        phoneInput.value = resumeData.personalInfo.phone || '';
        locationInput.value = resumeData.personalInfo.location || '';
        skillsInput.value = resumeData.skills || '';

        // Trigger input events to update preview
        fullNameInput.dispatchEvent(new Event('input'));
        emailInput.dispatchEvent(new Event('input'));
        phoneInput.dispatchEvent(new Event('input'));
        locationInput.dispatchEvent(new Event('input'));
        skillsInput.dispatchEvent(new Event('input'));

        // Load work experience
        resumeData.workExperience.forEach(() => {
            addWorkBtn.click();
        });
        const workEntries = document.querySelectorAll('.work-entry');
        resumeData.workExperience.forEach((work, index) => {
            const entry = workEntries[index];
            entry.querySelector('.company-name').value = work.company || '';
            entry.querySelector('.position').value = work.position || '';
            entry.querySelector('.start-date').value = work.startDate || '';
            entry.querySelector('.end-date').value = work.endDate || '';
            entry.querySelector('.description').value = work.description || '';
        });

        // Load education
        resumeData.education.forEach(() => {
            addEducationBtn.click();
        });
        const educationEntries = document.querySelectorAll('.education-entry');
        resumeData.education.forEach((edu, index) => {
            const entry = educationEntries[index];
            entry.querySelector('.school-name').value = edu.school || '';
            entry.querySelector('.degree').value = edu.degree || '';
            entry.querySelector('.edu-start-date').value = edu.startDate || '';
            entry.querySelector('.edu-end-date').value = edu.endDate || '';
        });

        // Update previews
        updateWorkPreview();
        updateEducationPreview();
    }

    // Initialize first work and education entries
    if (!document.querySelector('.work-entry')) {
        addWorkBtn.click();
    }
    if (!document.querySelector('.education-entry')) {
        addEducationBtn.click();
    }
});
