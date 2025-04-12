document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const resumesList = document.getElementById('resumesList');
    const badgesList = document.getElementById('badgesList');

    // Load user data from localStorage
    function loadUserData() {
        const userData = JSON.parse(localStorage.getItem('userData')) || {
            name: 'Guest User',
            email: 'guest@example.com'
        };

        userName.textContent = userData.name;
        userEmail.textContent = userData.email;
    }

    // Load and display resumes
    function loadResumes() {
        const resumes = JSON.parse(localStorage.getItem('resumeDraft'));
        
        if (resumes) {
            const lastModified = new Date().toLocaleDateString();
            const resumeCard = createResumeCard({
                title: resumes.personalInfo.fullName || 'Untitled Resume',
                lastModified,
                experience: resumes.workExperience.length || 0,
                education: resumes.education.length || 0
            });
            resumesList.appendChild(resumeCard);
        }

        // Add empty state if no resumes
        if (!resumesList.children.length) {
            const emptyState = document.createElement('div');
            emptyState.className = 'col-span-2 text-center py-12 bg-secondary rounded-xl';
            emptyState.innerHTML = `
                <div class="text-gray-400 mb-4">
                    <i class="fas fa-file-alt text-4xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2">No Resumes Yet</h3>
                <p class="text-gray-400 mb-4">Start building your professional resume now</p>
                <a href="resume.html" class="inline-block bg-accent text-black px-6 py-2 rounded-lg font-semibold hover:bg-accent/90 transition">
                    Create Resume
                </a>
            `;
            resumesList.appendChild(emptyState);
        }
    }

    // Load and display NFT badges
    function loadBadges() {
        const badges = JSON.parse(localStorage.getItem('mintedBadges')) || [];
        
        if (badges.length) {
            badges.forEach(badge => {
                const badgeCard = createBadgeCard(badge);
                badgesList.appendChild(badgeCard);
            });
        } else {
            // Add empty state if no badges
            const emptyState = document.createElement('div');
            emptyState.className = 'col-span-3 text-center py-12 bg-secondary rounded-xl';
            emptyState.innerHTML = `
                <div class="text-gray-400 mb-4">
                    <i class="fas fa-cube text-4xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2">No NFT Badges Yet</h3>
                <p class="text-gray-400 mb-4">Start minting your skill badges on the blockchain</p>
                <a href="nft.html" class="inline-block bg-accent text-black px-6 py-2 rounded-lg font-semibold hover:bg-accent/90 transition">
                    Mint Badge
                </a>
            `;
            badgesList.appendChild(emptyState);
        }
    }

    // Create resume card element
    function createResumeCard(resume) {
        const card = document.createElement('div');
        card.className = 'bg-secondary rounded-xl p-6 hover:bg-secondary/80 transition';
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-lg font-semibold mb-1">${resume.title}</h3>
                    <p class="text-sm text-gray-400">Last modified: ${resume.lastModified}</p>
                </div>
                <div class="flex space-x-2">
                    <button class="text-gray-400 hover:text-accent transition" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-gray-400 hover:text-red-500 transition" title="Delete">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <div class="space-y-2">
                <div class="flex items-center text-sm text-gray-400">
                    <i class="fas fa-briefcase mr-2"></i>
                    <span>${resume.experience} Work Experience</span>
                </div>
                <div class="flex items-center text-sm text-gray-400">
                    <i class="fas fa-graduation-cap mr-2"></i>
                    <span>${resume.education} Education</span>
                </div>
            </div>
            <div class="mt-4 flex space-x-2">
                <a href="resume.html" class="text-accent hover:text-accent/80 transition text-sm">
                    <i class="fas fa-edit mr-1"></i>Edit
                </a>
                <button class="text-accent hover:text-accent/80 transition text-sm">
                    <i class="fas fa-download mr-1"></i>Download PDF
                </button>
            </div>
        `;

        // Add event listeners
        const deleteBtn = card.querySelector('.fa-trash-alt').parentElement;
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this resume?')) {
                localStorage.removeItem('resumeDraft');
                card.remove();
                loadResumes(); // Reload to show empty state if needed
            }
        });

        const downloadBtn = card.querySelector('.fa-download').parentElement;
        downloadBtn.addEventListener('click', () => {
            window.location.href = 'resume.html?action=download';
        });

        return card;
    }

    // Create NFT badge card element
    function createBadgeCard(badge) {
        const card = document.createElement('div');
        card.className = 'bg-secondary rounded-xl overflow-hidden';
        
        // Get badge image based on skill type
        const badgeImages = {
            'web-development': 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
            'blockchain': 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg',
            'ui-ux': 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
            'cloud': 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
            'data-science': 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
            'cybersecurity': 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg'
        };

        const badgeImage = badgeImages[badge.skill] || badgeImages['web-development'];
        const badgeName = badge.skill.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        card.innerHTML = `
            <img src="${badgeImage}" alt="${badgeName}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${badgeName}</h3>
                <p class="text-gray-400 mb-4">Minted on ${new Date(badge.timestamp).toLocaleDateString()}</p>
                <div class="space-y-2 text-sm">
                    <div class="flex items-center text-gray-400">
                        <i class="fas fa-link mr-2"></i>
                        <a href="https://explorer.aptoslabs.com/txn/${badge.transactionHash}" 
                           target="_blank" 
                           class="text-accent hover:text-accent/80 transition break-all">
                            ${badge.transactionHash}
                        </a>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    // Initialize dashboard
    loadUserData();
    loadResumes();
    loadBadges();

    // Handle sidebar navigation
    const sidebarButtons = document.querySelectorAll('.sidebar button');
    sidebarButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state from all buttons
            sidebarButtons.forEach(btn => btn.classList.remove('bg-black'));
            // Add active state to clicked button
            button.classList.add('bg-black');
        });
    });
});
