import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AlertCircle, CheckCircle2, Copy, Share2, Check, Star } from 'lucide-react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';
import GigStepper from '../../components/gigs/GigStepper';
import GigOverviewForm from '../../components/gigs/GigOverviewForm';
import GigHelpSidebar from '../../components/gigs/GigHelpSidebar';
import GigPricingForm from '../../components/gigs/GigPricingForm';
import GigDescriptionForm from '../../components/gigs/GigDescriptionForm';
import GigRequirementsForm from '../../components/gigs/GigRequirementsForm';
import GigGalleryForm from '../../components/gigs/GigGalleryForm';
import { createGig, getCategories, getGigMetadata, getPricingFeatures, getSubcategories, getExtraServices, publishGig } from '../../services/gigMetadataService';

const packageKeys = ['basic', 'standard', 'premium'];
const packageTitles = {
    basic: 'Basic',
    standard: 'Standard',
    premium: 'Premium',
};

const initialFieldByStep = {
    1: 'gigTitle',
    2: 'category',
    3: 'description',
    4: 'description',
    5: 'searchTags',
    6: 'searchTags',
};

function createEmptyPackages(features) {
    return packageKeys.reduce((accumulator, packageKey) => {
        accumulator[packageKey] = {
            packageName: packageTitles[packageKey],
            price: '',
            deliveryDays: '',
            description: '',
            revisions: '',
            featureValues: (features || []).reduce((featureAccumulator, feature) => {
                featureAccumulator[feature.key] = feature.inputType === 'boolean' ? '' : '';
                return featureAccumulator;
            }, {}),
            isPopular: packageKey === 'standard',
        };
        return accumulator;
    }, {});
}

function getFeatureSelectionValue(selectedMetadata, fieldId) {
    return selectedMetadata[fieldId] || '';
}

export default function CreateGig() {
    const navigate = useNavigate();
    const location = useLocation();

    const stepRoutes = [
        '/seller/gigs/create',
        '/seller/gigs/create/pricing',
        '/seller/gigs/create/description-faq',
        '/seller/gigs/create/requirements',
        '/seller/gigs/create/gallery',
        '/seller/gigs/create/publish',
    ];

    const stepTitles = ['Overview', 'Pricing', 'Description & FAQ', 'Requirements', 'Gallery', 'Publish'];

    const currentStepIndex = stepRoutes.indexOf(location.pathname) >= 0 ? stepRoutes.indexOf(location.pathname) : 0;
    const currentStep = currentStepIndex + 1;
    const [activeField, setActiveField] = useState(initialFieldByStep[currentStep] || 'gigTitle');
    const [gigTitle, setGigTitle] = useState('');
    const [description, setDescription] = useState('');
    const [searchTags, setSearchTags] = useState([]);
    const [positiveKeywords, setPositiveKeywords] = useState([]);
    const [packageDrafts, setPackageDrafts] = useState(createEmptyPackages([]));
    const [extrasList, setExtrasList] = useState([]);
    const [displayedPricingFeatures, setDisplayedPricingFeatures] = useState([]);
    const [selectedMetadata, setSelectedMetadata] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [saveError, setSaveError] = useState('');
    const [gigDescription, setGigDescription] = useState('');
    const [gigFaqs, setGigFaqs] = useState([]);
    const [gigRequirements, setGigRequirements] = useState([]);
    const [gigImages, setGigImages] = useState([]);
    const [isPublished, setIsPublished] = useState(false);
    const [publishedSlug, setPublishedSlug] = useState('');
    const [publishErrors, setPublishErrors] = useState([]);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        const url = `${window.location.origin}/service/${publishedSlug}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getValidationErrors = () => {
        const errors = [];
        if (!gigTitle.trim()) {
            errors.push('Overview: Gig title is required.');
        } else if (gigTitle.trim().length < 15) {
            errors.push('Overview: Gig title must be at least 15 characters.');
        }
        if (!selectedCategory) {
            errors.push('Overview: Category must be selected.');
        }
        if (!selectedSubcategory) {
            errors.push('Overview: Subcategory must be selected.');
        }

        const requiredMetadata = (metadataQuery.data || []).filter((group) => group.required);
        for (const group of requiredMetadata) {
            if (!selectedMetadata[group.id]) {
                errors.push(`Overview: Mandatory metadata selection "${group.title}" is required.`);
            }
        }

        const pkgKeys = ['basic', 'standard', 'premium'];
        for (const key of pkgKeys) {
            const pkg = packageDrafts[key];
            if (!pkg?.packageName?.trim()) {
                errors.push(`Pricing: Package name for "${key}" package is required.`);
            }
            if (!pkg?.description?.trim()) {
                errors.push(`Pricing: Package description for "${key}" package is required.`);
            }
            if (!pkg?.price || Number(pkg.price) <= 0) {
                errors.push(`Pricing: Price for "${key}" package must be a valid positive number.`);
            }
            if (!pkg?.deliveryDays || Number(pkg.deliveryDays) <= 0) {
                errors.push(`Pricing: Delivery days for "${key}" package must be specified.`);
            }
        }

        if (!gigDescription || gigDescription.trim().length < 100) {
            errors.push('Description: Detailed description must be at least 100 characters.');
        }

        if (!gigRequirements || gigRequirements.length === 0) {
            errors.push('Requirements: At least one question for the buyer is required.');
        }

        if (!gigImages || gigImages.length === 0) {
            errors.push('Gallery: At least one image is required.');
        } else {
            const untagged = gigImages.filter((img) => !img.isTagged).length;
            if (untagged > 0) {
                errors.push(`Gallery: All uploaded images must be tagged before publishing.`);
            }
        }

        if (!termsAccepted) {
            errors.push('Terms: You must accept our Terms of Service before publishing.');
        }

        return [...new Set(errors)];
    };

    const isOverviewStep = currentStep === 1;
    const isPricingStep = currentStep === 2;
    const isDescriptionStep = currentStep === 3;
    const isRequirementsStep = currentStep === 4;
    const isGalleryStep = currentStep === 5;

    const handleStepChange = (stepNumber) => {
        const route = stepRoutes[stepNumber - 1];
        if (route) navigate(route);
        setActiveField(initialFieldByStep[stepNumber] || 'default');
    };

    const handleSaveContinue = () => {
        
        if (isDescriptionStep && (!gigDescription || gigDescription.length < 100)) {
            setSaveError('Description must be at least 100 characters');
            return;
        }
        if (isRequirementsStep && gigRequirements.length === 0) {
            setSaveError('You must add at least one requirement question');
            return;
        }
        if (isGalleryStep && (gigImages.length === 0 || !gigImages.every((img) => img.isTagged))) {
            setSaveError('You must upload and tag all images');
            return;
        }

        setSaveError('');
        const nextRoute = stepRoutes[currentStepIndex + 1];
        if (nextRoute) {
            setActiveField(initialFieldByStep[currentStep + 1] || 'default');
            navigate(nextRoute);
            return;
        }
        navigate('/seller/gigs');
    };

    const categoriesQuery = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    const subcategoriesQuery = useQuery({
        queryKey: ['subcategories', selectedCategory],
        queryFn: () => getSubcategories(selectedCategory),
        enabled: Boolean(selectedCategory),
    });

    const metadataQuery = useQuery({
        queryKey: ['gig-metadata', selectedSubcategory],
        queryFn: () => getGigMetadata(selectedSubcategory),
        enabled: Boolean(selectedSubcategory),
    });

    const pricingFeaturesQuery = useQuery({
        queryKey: ['pricing-features', selectedSubcategory],
        queryFn: () => getPricingFeatures(selectedSubcategory),
        enabled: Boolean(selectedSubcategory),
    });

    const extraServicesQuery = useQuery({
        queryKey: ['extra-services'],
        queryFn: getExtraServices,
    });

    const createAndPublishGigMutation = useMutation({
        mutationFn: async (payload) => {
            const created = await createGig({ ...payload, status: 'draft' });
            const published = await publishGig(created._id);
            return published;
        },
        onSuccess: (data) => {
            setPublishedSlug(data.slug);
            setIsPublished(true);
        },
        onError: (error) => {
            setSaveError(error.message || 'Unable to publish gig');
        },
    });

    const handleCategoryChange = (nextCategoryId) => {
        setSelectedCategory(nextCategoryId);
        setSelectedSubcategory('');
        setSelectedMetadata({});
        setActiveField('category');
    };

    const handleSubcategoryChange = (nextSubcategoryId) => {
        setSelectedSubcategory(nextSubcategoryId);
        setSelectedMetadata({});
        setActiveField('category');
    };

    const handleMetadataSelect = (groupId, value) => {
        setSelectedMetadata((prev) => ({
            ...prev,
            [groupId]: value,
        }));
    };

    const handlePackageChange = (packageKey, fieldPath, value) => {
        setPackageDrafts((current) => {
            const nextPackage = {
                ...(current[packageKey] || createEmptyPackages(pricingFeaturesQuery.data)[packageKey]),
                featureValues: {
                    ...((current[packageKey] || {}).featureValues || {}),
                },
            };

            if (fieldPath.startsWith('featureValues.')) {
                const featureKey = fieldPath.replace('featureValues.', '');
                nextPackage.featureValues[featureKey] = value;
            } else {
                nextPackage[fieldPath] = value;
            }

            return {
                ...current,
                [packageKey]: nextPackage,
            };
        });
    };

    const handleExtrasChange = (nextExtras) => {
        setExtrasList(nextExtras || []);
    };

    const handleFeaturesChange = (features) => {
        setDisplayedPricingFeatures(features || []);
    };

    const handleDescriptionChange = (desc) => {
        setGigDescription(desc);
    };

    const handleFaqsChange = (faqs) => {
        setGigFaqs(faqs);
    };

    const handleRequirementsChange = (requirements) => {
        setGigRequirements(requirements || []);
    };

    const handleImagesChange = (images) => {
        setGigImages(images || []);
    };

    const selectedCategoryName = useMemo(
        () => categoriesQuery.data?.find((item) => item._id === selectedCategory)?.name || '',
        [categoriesQuery.data, selectedCategory],
    );

    const selectedSubcategoryName = useMemo(
        () => subcategoriesQuery.data?.find((item) => item._id === selectedSubcategory)?.name || '',
        [selectedSubcategory, subcategoriesQuery.data],
    );

    const selectedMetadataSummary = useMemo(() => {
        return (metadataQuery.data || []).map((group) => ({
            label: group.title,
            value: getFeatureSelectionValue(selectedMetadata, group.id),
        }));
    }, [metadataQuery.data, selectedMetadata]);

    const pricingPayload = useMemo(() => {
        return packageKeys.map((packageKey) => {
            const packageDraft = packageDrafts[packageKey] || {};
            const extras = (extrasList || []).map((extra) => {
                const included = Boolean(packageDraft.featureValues?.[`extra:${extra.id}`]);
                const price = packageDraft.featureValues?.[`extraPrice:${extra.id}`] ?? '';
                return {
                    id: extra.id,
                    name: extra.name,
                    included,
                    price,
                };
            }).filter((e) => e.included || e.price !== '');

            return {
                packageName: packageDraft.packageName,
                description: packageDraft.description,
                price: packageDraft.price,
                deliveryDays: packageDraft.deliveryDays,
                revisions: packageDraft.revisions,
                isPopular: packageDraft.isPopular,
                featureValues: packageDraft.featureValues,
                extras,
            };
        });
    }, [packageDrafts, extrasList]);

    const isOverviewValid = useMemo(() => {
        return Boolean(gigTitle.trim() && selectedCategory && selectedSubcategory && gigTitle.trim().length >= 15);
    }, [gigTitle, selectedCategory, selectedSubcategory]);

    const isMetadataValid = useMemo(() => {
        const requiredMetadata = (metadataQuery.data || []).filter((group) => group.required);
        return requiredMetadata.every((group) => selectedMetadata[group.id]);
    }, [metadataQuery.data, selectedMetadata]);

    const isPricingValid = useMemo(() => {
        return packageKeys.every((key) => {
            const pkg = packageDrafts[key];
            return Boolean(pkg?.packageName?.trim() && pkg?.description?.trim() && pkg?.price && Number(pkg.price) > 0 && pkg?.deliveryDays && Number(pkg.deliveryDays) > 0);
        });
    }, [packageDrafts]);

    const isDescriptionValid = useMemo(() => {
        return Boolean(gigDescription && gigDescription.trim().length >= 100);
    }, [gigDescription]);

    const isRequirementsValid = useMemo(() => {
        return Boolean(gigRequirements && gigRequirements.length > 0);
    }, [gigRequirements]);

    const isGalleryValid = useMemo(() => {
        return Boolean(gigImages && gigImages.length > 0 && gigImages.every((img) => img.isTagged));
    }, [gigImages]);

    const handlePublish = () => {
        
        const errors = getValidationErrors();
        if (errors.length > 0) {
            setPublishErrors(errors);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        setPublishErrors([]);

        
        const metadataSelections = Object.entries(selectedMetadata)
            .filter(([, value]) => value)
            .map(([fieldId, value]) => ({ fieldId, value: String(value) }));

        
        const packages = packageKeys.map((key) => {
            const pkg = packageDrafts[key] || {};
            return {
                packageName: pkg.packageName,
                description: pkg.description,
                price: Number(pkg.price) || 0,
                deliveryDays: Number(pkg.deliveryDays) || 0,
                revisions: Number(pkg.revisions) || 0,
                isPopular: Boolean(pkg.isPopular),
                featureValues: pkg.featureValues || {},
            };
        });

        
        const extras = (extrasList || [])
            .filter((e) => e.name)
            .map((e) => ({
                name: e.name,
                description: e.description || '',
                price: Number(e.price) || 0,
                deliveryDays: Number(e.deliveryDays) || 0,
            }));

        
        const gallery = (gigImages || []).map((img) => ({
            imageUrl: img.imageUrl || img.preview || '',
            isPrimary: Boolean(img.isPrimary),
            isTagged: Boolean(img.isTagged),
        }));

        createAndPublishGigMutation.mutate({
            title: gigTitle.trim(),
            categoryId: selectedCategory,
            subcategoryId: selectedSubcategory,
            searchTags,
            positiveKeywords,
            description: gigDescription,
            metadataSelections,
            faq: gigFaqs,
            requirements: gigRequirements,
            gallery,
            packages,
            extras,
        });
    };

    const categoryError = categoriesQuery.error?.message || '';
    const subcategoryError = subcategoriesQuery.error?.message || '';
    const metadataError = metadataQuery.error?.message || '';
    const pricingError = pricingFeaturesQuery.error?.message || '';

    if (isPublished) {
        const shareUrl = `${window.location.origin}/service/${publishedSlug}`;
        const shareText = `Check out my awesome new service on Nexlance: ${gigTitle}`;

        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <DashboardNavbar />
                <main className="flex-1 flex items-center justify-center p-6 my-10">
                    <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-xl p-10 text-center relative overflow-hidden transition-all duration-300">
                        <div className="absolute inset-0 pointer-events-none opacity-30">
                            <div className="absolute top-10 left-10 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                            <div className="absolute top-20 right-20 w-4 h-4 bg-emerald-500 rounded-full animate-bounce"></div>
                            <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-sky-400 rounded-full animate-ping"></div>
                        </div>

                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-500 shadow-md">
                                <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                            Your Gig is open for business!
                        </h1>
                        <p className="text-gray-600 text-lg mb-8">
                            Spread the word to boost your sales.
                        </p>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 text-left">
                                Public service URL
                            </p>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    readOnly
                                    value={shareUrl}
                                    className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-mono text-gray-700 select-all focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-sm relative cursor-pointer"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-4 w-4" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" />
                                            Copy URL
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="mb-10">
                            <p className="text-sm font-semibold text-gray-500 mb-4">Share your Gig</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#1565C0] text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow hover:scale-105"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Facebook
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow hover:scale-105"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Twitter/X
                                </a>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-[#0A66C2] hover:bg-[#00529B] text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow hover:scale-105"
                                >
                                    <Share2 className="w-4 h-4" />
                                    LinkedIn
                                </a>
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow hover:scale-105"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </a>
                            </div>
                        </div>

                        <div className="flex justify-center border-t border-gray-150 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/seller/gigs?status=active')}
                                className="w-full sm:w-48 bg-[#22c55e] hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow transition-all duration-200 cursor-pointer text-center"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <DashboardNavbar />

            <main className="flex-1">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <GigStepper activeStep={currentStep} onStepChange={handleStepChange} onSave={handleSaveContinue} />

                    {isPricingStep ? (
                        <div className="mt-6">
                            <GigPricingForm
                                subcategoryName={selectedSubcategoryName}
                                pricingFeatures={displayedPricingFeatures.length > 0 ? displayedPricingFeatures : (pricingFeaturesQuery.data || [])}
                                packageDrafts={packageDrafts}
                                onPackageChange={handlePackageChange}
                                onExtrasChange={handleExtrasChange}
                                onFeaturesChange={handleFeaturesChange}
                                defaultExtras={extraServicesQuery.data?.map((extra) => ({
                                    id: extra.id,
                                    name: extra.name,
                                })) || []}
                            />
                        </div>
                    ) : (
                        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-4">
                            <div className="space-y-6 lg:col-span-3">
                                <section className="rounded-lg bg-pink-100 p-6">
                                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                        <div>
                                            <p className="text-sm font-semibold text-pink-700">Nexlance Studio</p>
                                            <p className="mt-1 text-sm text-pink-800">
                                                Build a dynamic gig package flow backed by MongoDB catalog data, pricing rules, and publish-ready payloads.
                                            </p>
                                        </div>

                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-200 text-xl">N</div>
                                    </div>
                                </section>

                                {isOverviewStep ? (
                                    <GigOverviewForm
                                        onSaveContinue={handleSaveContinue}
                                        activeField={activeField}
                                        setActiveField={setActiveField}
                                        categories={categoriesQuery.data || []}
                                        subcategories={subcategoriesQuery.data || []}
                                        metadata={metadataQuery.data || []}
                                        selectedCategory={selectedCategory}
                                        selectedSubcategory={selectedSubcategory}
                                        selectedMetadata={selectedMetadata}
                                        metadataLoading={metadataQuery.isLoading}
                                        metadataError={metadataError}
                                        categoriesLoading={categoriesQuery.isLoading}
                                        categoriesError={categoryError}
                                        subcategoriesLoading={subcategoriesQuery.isLoading}
                                        subcategoriesError={subcategoryError}
                                        onCategoryChange={handleCategoryChange}
                                        onSubcategoryChange={handleSubcategoryChange}
                                        onMetadataSelect={handleMetadataSelect}
                                        gigTitle={gigTitle}
                                        setGigTitle={setGigTitle}
                                        description={description}
                                        setDescription={setDescription}
                                        searchTags={searchTags}
                                        setSearchTags={setSearchTags}
                                        positiveKeywords={positiveKeywords}
                                        setPositiveKeywords={setPositiveKeywords}
                                    />
                                ) : isDescriptionStep ? (
                                    <GigDescriptionForm
                                        description={gigDescription}
                                        faqs={gigFaqs}
                                        onDescriptionChange={handleDescriptionChange}
                                        onFaqsChange={handleFaqsChange}
                                        onSaveContinue={handleSaveContinue}
                                        onBack={() => navigate(stepRoutes[currentStepIndex - 1])}
                                    />
                                ) : isRequirementsStep ? (
                                    <GigRequirementsForm
                                        requirements={gigRequirements}
                                        onRequirementsChange={handleRequirementsChange}
                                        onSaveContinue={handleSaveContinue}
                                        onBack={() => navigate(stepRoutes[currentStepIndex - 1])}
                                    />
                                ) : isGalleryStep ? (
                                    <GigGalleryForm
                                        images={gigImages}
                                        categoryMetadata={metadataQuery.data || []}
                                        onImagesChange={handleImagesChange}
                                        onSaveContinue={handleSaveContinue}
                                        onBack={() => navigate(stepRoutes[currentStepIndex - 1])}
                                    />
                                ) : (
                                    <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md">
                                        <h1 className="text-2xl font-semibold text-gray-900">Publish Gig</h1>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Review your Gig details and submit it to launch your service on the Nexlance marketplace.
                                        </p>

                                        {publishErrors.length > 0 && (
                                            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                                                <div className="flex items-center gap-2 font-bold mb-2">
                                                    <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                                                    <span>Please fix the following errors before publishing:</span>
                                                </div>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    {publishErrors.map((err, idx) => (
                                                        <li key={idx}>{err}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        
                                        <div className="mt-8 space-y-6">
                                            
                                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                                                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Publish Checklist</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={isOverviewValid ? "text-emerald-500 font-bold" : "text-red-500 font-bold"}>
                                                            {isOverviewValid ? "✓" : "✗"}
                                                        </span>
                                                        <span className="text-sm font-medium text-gray-700">Overview Completed</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={isMetadataValid ? "text-emerald-500 font-bold" : "text-red-500 font-bold"}>
                                                            {isMetadataValid ? "✓" : "✗"}
                                                        </span>
                                                        <span className="text-sm font-medium text-gray-700">All Required Metadata Selected</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={isPricingValid ? "text-emerald-500 font-bold" : "text-red-500 font-bold"}>
                                                            {isPricingValid ? "✓" : "✗"}
                                                        </span>
                                                        <span className="text-sm font-medium text-gray-700">Pricing Packages Completed</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={isDescriptionValid ? "text-emerald-500 font-bold" : "text-red-500 font-bold"}>
                                                            {isDescriptionValid ? "✓" : "✗"}
                                                        </span>
                                                        <span className="text-sm font-medium text-gray-700">Description Completed (min 100 chars)</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={isRequirementsValid ? "text-emerald-500 font-bold" : "text-red-500 font-bold"}>
                                                            {isRequirementsValid ? "✓" : "✗"}
                                                        </span>
                                                        <span className="text-sm font-medium text-gray-700">Requirements Completed (min 1 question)</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={isGalleryValid ? "text-emerald-500 font-bold" : "text-red-500 font-bold"}>
                                                            {isGalleryValid ? "✓" : "✗"}
                                                        </span>
                                                        <span className="text-sm font-medium text-gray-700">Gallery Upload Completed (all tagged)</span>
                                                    </div>
                                                </div>
                                            </div>

                                            
                                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3">1. Overview</h3>
                                                <div className="space-y-3 text-sm">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 border-b border-gray-100 pb-2">
                                                        <span className="w-24 text-gray-500 font-medium">Title</span>
                                                        <span className="text-gray-900 font-semibold">{gigTitle || "Untitled gig"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 border-b border-gray-100 pb-2">
                                                        <span className="w-24 text-gray-500 font-medium">Category</span>
                                                        <span className="text-gray-900">{selectedCategoryName || "Not selected"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 border-b border-gray-100 pb-2">
                                                        <span className="w-24 text-gray-500 font-medium">Subcategory</span>
                                                        <span className="text-gray-900">{selectedSubcategoryName || "Not selected"}</span>
                                                    </div>
                                                    {selectedMetadataSummary.length > 0 && (
                                                        <div className="border-b border-gray-100 pb-2">
                                                            <span className="text-gray-500 font-medium block mb-2">MetadataSelections</span>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                                {selectedMetadataSummary.map((item) => (
                                                                    <div key={item.label} className="flex justify-between p-2 bg-gray-50 rounded">
                                                                        <span className="text-gray-600 font-medium">{item.label}</span>
                                                                        <span className="text-gray-900 font-semibold">{item.value || "Not selected"}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="flex flex-wrap gap-2 pt-1">
                                                        <span className="text-gray-500 font-medium mr-2">Tags:</span>
                                                        {searchTags.length > 0 ? searchTags.map((tag) => (
                                                            <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full font-medium">{tag}</span>
                                                        )) : <span className="text-gray-400 italic">None added</span>}
                                                    </div>
                                                </div>
                                            </div>

                                            
                                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">2. Pricing packages</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {packageKeys.map((key) => {
                                                        const pkg = packageDrafts[key] || {};
                                                        return (
                                                            <div key={key} className="border border-gray-250 rounded-xl p-4 bg-gray-50">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <span className="text-xs font-bold uppercase text-gray-500">{packageTitles[key]}</span>
                                                                    <span className="text-lg font-bold text-emerald-600">${pkg.price || "—"}</span>
                                                                </div>
                                                                <h4 className="text-sm font-semibold text-gray-900 mb-1">{pkg.packageName || "Package Name"}</h4>
                                                                <p className="text-xs text-gray-600 line-clamp-3 mb-3">{pkg.description || "No description filled"}</p>
                                                                <div className="text-xs text-gray-500 space-y-1">
                                                                    <div>Delivery: <span className="font-medium text-gray-700">{pkg.deliveryDays ? `${pkg.deliveryDays} Days` : "—"}</span></div>
                                                                    <div>Revisions: <span className="font-medium text-gray-700">{pkg.revisions ? pkg.revisions : "—"}</span></div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            
                                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3">3. Description & FAQ</h3>
                                                <div className="space-y-3">
                                                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-xs text-gray-700 max-h-32 overflow-y-auto whitespace-pre-line font-serif">
                                                        {gigDescription || <span className="text-gray-400 italic">No description filled</span>}
                                                    </div>
                                                    <div className="text-xs text-gray-600 font-medium">
                                                        FAQs added: <span className="text-gray-900 font-bold">{gigFaqs.length} questions</span>
                                                    </div>
                                                </div>
                                            </div>

                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                
                                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3">4. Requirements</h3>
                                                    <p className="text-xs text-gray-600 mb-2">
                                                        Required questions for buyers: <span className="font-bold text-gray-900">{gigRequirements.length}</span>
                                                    </p>
                                                    <div className="space-y-1.5 max-h-24 overflow-y-auto">
                                                        {gigRequirements.map((req, idx) => (
                                                            <div key={idx} className="text-xs bg-gray-50 p-2 rounded border border-gray-100 truncate">
                                                                <span className="font-bold text-gray-500 mr-2">Q{idx + 1}:</span>
                                                                {req.questionTitle}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                
                                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3">5. Gallery</h3>
                                                    <p className="text-xs text-gray-600 mb-3">
                                                        Uploaded images: <span className="font-bold text-gray-900">{gigImages.length}</span>
                                                    </p>
                                                    <div className="flex gap-2 overflow-x-auto pb-1">
                                                        {gigImages.map((img, idx) => (
                                                            <div key={idx} className="relative w-12 h-12 rounded border border-gray-200 overflow-hidden shrink-0">
                                                                <img src={img.imageUrl} className="w-full h-full object-cover" alt="" />
                                                                {img.isPrimary && (
                                                                    <div className="absolute inset-0 bg-yellow-400/20 flex items-center justify-center">
                                                                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-600" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            
                                            <div className="mt-8 rounded-xl border border-emerald-250 bg-emerald-50/50 p-6 flex items-start gap-3">
                                                <input
                                                    id="termsAccepted"
                                                    type="checkbox"
                                                    checked={termsAccepted}
                                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                                    className="mt-1 h-5 w-5 rounded border-gray-305 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                                />
                                                <label htmlFor="termsAccepted" className="text-sm text-gray-700 leading-relaxed select-none cursor-pointer">
                                                    <span className="font-bold text-gray-900">Accept Terms and Conditions: </span>
                                                    I agree to Nexlance's Terms of Service and Privacy Policy, and certify that I own the rights to all content and files uploaded in this Gig. I understand that misrepresentation of my skills or content may lead to termination of my seller account.
                                                </label>
                                            </div>
                                        </div>

                                        {saveError ? <p className="mt-6 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg font-medium">{saveError}</p> : null}

                                        {/* Actions */}
                                        <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                                            <button
                                                type="button"
                                                onClick={() => navigate(stepRoutes[currentStepIndex - 1])}
                                                className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handlePublish}
                                                disabled={createAndPublishGigMutation.isPending}
                                                className="rounded-lg bg-emerald-600 hover:bg-emerald-700 px-8 py-3 text-sm font-bold text-white transition-all duration-200 cursor-pointer shadow disabled:opacity-50"
                                            >
                                                {createAndPublishGigMutation.isPending ? "Publishing..." : "Publish Gig"}
                                            </button>
                                        </div>
                                    </section>
                                )}
                            </div>

                            <div className="lg:col-span-1">
                                <GigHelpSidebar activeField={activeField} />
                                <div className="mt-6 space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-900">Data status</h3>
                                    <p className="text-sm text-gray-600">Categories: {categoriesQuery.isLoading ? 'Loading' : 'Ready'}</p>
                                    <p className="text-sm text-gray-600">Subcategories: {subcategoriesQuery.isLoading ? 'Loading' : 'Ready'}</p>
                                    <p className="text-sm text-gray-600">Metadata: {metadataQuery.isLoading ? 'Loading' : 'Ready'}</p>
                                    <p className="text-sm text-gray-600">Pricing: {pricingFeaturesQuery.isLoading ? 'Loading' : 'Ready'}</p>
                                    {categoryError || subcategoryError || metadataError || pricingError ? (
                                        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                            {categoryError || subcategoryError || metadataError || pricingError}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}