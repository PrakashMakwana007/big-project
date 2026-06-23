import React from 'react';
import { useEffect, useState } from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';
import ProfileHeader from '../../components/profile/ProfileHeader';
import AboutSection from '../../components/profile/AboutSection';
import AboutModal from '../../components/profile/AboutModal';
import PortfolioSection from '../../components/profile/PortfolioSection';
import PortfolioModal from '../../components/profile/PortfolioModal';
import IntroVideoSection from '../../components/profile/IntroVideoSection';
import IntroVideoModal from '../../components/profile/IntroVideoModal';
import WorkExperienceSection from '../../components/profile/WorkExperienceSection';
import WorkExperienceModal from '../../components/profile/WorkExperienceModal';
import SkillsSection from '../../components/profile/SkillsSection';
import SkillsModal from '../../components/profile/SkillsModal';
import EducationSection from '../../components/profile/EducationSection';
import EducationModal from '../../components/profile/EducationModal';
import CertificationsSection from '../../components/profile/CertificationsSection';
import CertificationModal from '../../components/profile/CertificationModal';
import SidebarProfileStrength from '../../components/profile/SidebarProfileStrength';
import EditProfileModal from '../../components/profile/EditProfileModal';
import api from '../../services/api';

export default function MyProfile() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isIntroVideoOpen, setIsIntroVideoOpen] = useState(false);
  const [isWorkExperienceOpen, setIsWorkExperienceOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isCertificationOpen, setIsCertificationOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  const savedUser = api.auth.getSavedUser() || {};

  const [aboutText, setAboutText] = useState(
    savedUser.about || 'Tell buyers about yourself, your skills, and the work you do.'
  );
  const [profileData, setProfileData] = useState({
    name: savedUser.name || 'New User',
    username: savedUser.username ? `@${savedUser.username}` : '',
    title: savedUser.title || 'Add your seller title',
    location: savedUser.location || 'Add your location',
    languages: savedUser.languages || 'Add languages',
  });

  
  
  useEffect(() => {
    let isMounted = true;

    api.users
      .getMyProfile()
      .then((data) => {
        if (!isMounted || !data) return;
        const user = data.user || data;

        setProfileData({
          name: user.name || 'New User',
          username: user.username ? `@${user.username}` : '',
          title: user.title || 'Add your seller title',
          location: user.location || 'Add your location',
          languages: user.languages || 'Add languages',
        });

        if (user.about) setAboutText(user.about);
      })
      .catch((err) => {
        console.error('Failed to load profile:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardNavbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">My Profile</h1>
              <p className="mt-2 text-sm text-gray-500">Edit your seller profile, portfolio, and professional details.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <ProfileHeader onEditProfile={() => setIsEditProfileOpen(true)} />
              <AboutSection onEditAbout={() => setIsAboutOpen(true)} />
              <PortfolioSection onAddPortfolio={() => setIsPortfolioOpen(true)} />
              <IntroVideoSection onAddIntroVideo={() => setIsIntroVideoOpen(true)} />
              <WorkExperienceSection onAddWorkExperience={() => setIsWorkExperienceOpen(true)} />
              <SkillsSection onAddSkills={() => setIsSkillsOpen(true)} />
              <EducationSection onAddEducation={() => setIsEducationOpen(true)} />
              <CertificationsSection onAddCertification={() => setIsCertificationOpen(true)} />
            </div>

            <aside className="space-y-6 lg:col-span-1">
              <SidebarProfileStrength />
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      <AboutModal
        isOpen={isAboutOpen}
        initialValue={aboutText}
        onClose={() => setIsAboutOpen(false)}
        onSave={(value) => {
          setAboutText(value);
          setIsAboutOpen(false);
        }}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        initialValue={profileData}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={(value) => {
          setProfileData(value);
          setIsEditProfileOpen(false);

          
          api.users.updateProfile(value).catch((err) => {
            console.error('Failed to save profile:', err);
          });
        }}
      />

      <IntroVideoModal isOpen={isIntroVideoOpen} onClose={() => setIsIntroVideoOpen(false)} />

      <WorkExperienceModal isOpen={isWorkExperienceOpen} onClose={() => setIsWorkExperienceOpen(false)} onSave={() => setIsWorkExperienceOpen(false)} />

      <SkillsModal
        isOpen={isSkillsOpen}
        onClose={() => setIsSkillsOpen(false)}
        onSave={() => setIsSkillsOpen(false)}
      />

      <EducationModal
        isOpen={isEducationOpen}
        onClose={() => setIsEducationOpen(false)}
        onSave={() => setIsEducationOpen(false)}
      />

      <CertificationModal
        isOpen={isCertificationOpen}
        onClose={() => setIsCertificationOpen(false)}
        onSave={() => setIsCertificationOpen(false)}
      />

      <PortfolioModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        onSave={() => setIsPortfolioOpen(false)}
      />
    </div>
  );
}