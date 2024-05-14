// import EcommerenceProducts from "src/pages/Ecommerence/EcommerenceProducts";
import { Navigate } from "react-router-dom"
import Dashboard from "../pages/Dashboard";
import DashboardSaas from "../pages/Dashboard-saas";
import DashboardCrypto from "../pages/Dashboard-crypto";
import DashboardBlog from "../pages/Dashboard-blog";
import DashboardJob from "../pages/Dashboard-job";

// File Manager
import FileManager from "../pages/FileManager/index"

//Ecommerce
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceAddProduct";
import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceShops from "../pages/Ecommerce/EcommerceShops/index";
import EcommerenceProducts from "../pages/Ecommerce/EcommerceProduct";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProductDetail";

// //Tasks
import TasksList from "../pages/Tasks/tasks-list";
import TasksKanban from "../pages/Tasks/tasks-kanban";
import TasksCreate from "../pages/Tasks/tasks-create";

//Invoices
import InvoicesList from "../pages/Invoices/invoices-list";
import InvoiceDetail from "../pages/Invoices/invoices-detail";

// //Projects
import ProjectsGrid from "../pages/Projects/projects-grid";
import ProjectsList from "../pages/Projects/projects-list";
import ProjectsCreate from "../pages/Projects/projects-create";
import ProjectsOverview from "../pages/Projects/ProjectOverview/projects-overview"

// Pages Calendar
import Calendar from "../pages/Calendar/index"

//Chat
import Chat from "../pages/Chat/Chat"

//Email
import EmailInbox from "../pages/Email/email-inbox"
import EmailRead from "../pages/Email/email-read";
import EmailBasicTemplate from "../pages/Email/email-basic-template";
import EmailAlertTemplate from "../pages/Email/email-template-alert";
import EmailTemplateBilling from "../pages/Email/email-template-billing"

//Contact Page 
import ContactsGrid from "../pages/Contacts/contacts-grid";
import ContactsList from "../pages/Contacts/ContactList/contacts-list"
import ContactsProfile from "../pages/Contacts/ContactProfile/contacts-profile";

//Blog
import BlogList from "../pages/Blog/BlogList/index";
import BlogGrid from "../pages/Blog/BlogGrid/index";
import BlogDetails from "../pages/Blog/BlogDetails";

//Job
import JobList from "../pages/JobPages/JobList";
import JobGrid from "../pages/JobPages/JobGrid/index";
import JobDetails from "../pages/JobPages/JobDetails";
import JobCategories from "../pages/JobPages/JobCategories";
import CandidateList from "../pages/JobPages/CandidateList";
import CandidateOverview from "../pages/JobPages/CandidateOverview";
import ApplyJobs from "../pages/JobPages/ApplyJobs/index";

//Crypto
import CryptoWallet from "../pages/Crypto/CryptoWallet/crypto-wallet";
import CryptoBuySell from "../pages/Crypto/crypto-buy-sell";
import CryptoExchange from "../pages/Crypto/crypto-exchange";
import CryptoLending from "../pages/Crypto/crypto-lending";
import CryptoKYCApplication from "../pages/Crypto/crypto-kyc-application";
import CryptoOrders from "../pages/Crypto/CryptoOrders/crypto-orders"
import CryptoIcoLanding from "../pages/Crypto/CryptoIcoLanding/index";

//Authentication pages
import Login1 from "../pages/AuthenticationInner/Login";
import Login2 from "../pages/AuthenticationInner/Login2";
import Register from "../pages/AuthenticationInner/Register";
import Register2 from "../pages/AuthenticationInner/Register2";
import Recoverpw from "../pages/AuthenticationInner/Recoverpw";
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2";
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2";
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail";
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2";
import EmailVerification from "../pages/AuthenticationInner/auth-email-verification";
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2";
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification";
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2";


//Pages
import PagesStarter from "../pages/Utility/pages-starter";
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesTimeline from "../pages/Utility/pages-timeline";
import PagesFaqs from "../pages/Utility/pages-faqs";
import PagesPricing from "../pages/Utility/pages-pricing";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

//Ui
import UiAlert from "../pages/Ui/UiAlert";
import UiButtons from "../pages/Ui/UiButtons";
import UiCards from "../pages/Ui/UiCards";
import UiDropdown from "../pages/Ui/UiDropdown";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiModal from "../pages/Ui/UiModal";
import UiOffCanvas from "../pages/Ui/UiOffCanvas";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UiProgressbar from "../pages/Ui/UiProgressbar";
import UiPlaceholders from "../pages/Ui/UiPlaceholders";
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiToasts from "../pages/Ui/UiToast";
import UiVideo from "../pages/Ui/UiVideo";
import UiGeneral from "../pages/Ui/UiGeneral";
import UiColors from "../pages/Ui/UiColors";
import UiUtilities from "../pages/Ui/UiUtilities";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiRating from "../pages/Ui/UiRating";
import UiNotifications from "../pages/Ui/UiNotifications"


// Forms
import FormElements from "../pages/Forms/FormElements";
import FormLayouts from "../pages/Forms/FormLayouts";
import FormEditors from "../pages/Forms/FormEditors";
import FormUpload from "../pages/Forms/FormUpload";
import FormRepeater from "../pages/Forms/FormRepeater";
import FormWizard from "../pages/Forms/FormWizard";
import FormMask from "../pages/Forms/FormMask";
import FormAdvanced from "../pages/Forms/FormAdvanced";
import FormXeditable from "../pages/Forms/FormXeditable";


//Tables
import BasicTables from "../pages/Tables/BasicTables";

// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import EChart from "../pages/Charts/EChart";
import SparklineChart from "../pages/Charts/SparklineChart";
import ReCharts from "../pages/Charts/ReCharts";
import ChartjsChart from "../pages/Charts/ChartjsChart"

//Icons
import IconBoxicons from "../pages/Crypto/Icons/IconBoxicons";
import IconDripicons from "../pages/Crypto/Icons/IconDripicons";
import IconMaterialdesign from "../pages/Crypto/Icons/IconMaterialdesign";
import IconFontawesome from "../pages/Crypto/Icons/IconFontawesome"


// Maps
import MapsVector from "../pages/Maps/MapsVector";
import MapsLeaflet from "../pages/Maps/MapsLeaflet";
import MapsGoogle from "../pages/Maps/MapGoogle";
import DataTable from "../pages/Tables/DataTable";

// Auth
import Login from "../pages/Authentication/login";
import Logout from "../pages/Authentication/Logout";
import UserProfile from "../pages/Authentication/user-profile";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import SignUp from "../pages/Authentication/Register"
import FormValidations from "../pages/Forms/FormValidations";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/dashboard-saas", component: <DashboardSaas /> },
  { path: "/dashboard-crypto", component: <DashboardCrypto /> },
  { path: "/dashboard-blog", component: <DashboardBlog /> },
  { path: "/dashboard-job", component: <DashboardJob /> },

  //File Manager
  { path: "/apps-filemanager", component: <FileManager /> },

  //chat
  { path: "/chat", component: <Chat /> },

  //calendar
  { path: "/calendar", component: <Calendar /> },

  //Ecommerce
  { path: "/ecommerce-product-detail/:id?", component: <EcommerceProductDetail /> },
  { path: "/ecommerce-products", component: <EcommerenceProducts /> },
  { path: "/ecommerce-add-product", component: <EcommerceAddProduct /> },
  { path: "/ecommerce-cart", component: <EcommerceCart /> },
  { path: "/ecommerce-checkout", component: <EcommerceCheckout /> },
  { path: "/ecommerce-orders", component: <EcommerceOrders /> },
  { path: "/ecommerce-customers", component: <EcommerceCustomers /> },
  { path: "/ecommerce-shops", component: <EcommerceShops /> },


  //Blog
  { path: "/blog-list", component: <BlogList /> },
  { path: "/blog-grid", component: <BlogGrid /> },
  { path: "/blog-details", component: <BlogDetails /> },

  //Crypto
  { path: "/crypto-wallet", component: <CryptoWallet /> },
  { path: "/crypto-buy-sell", component: <CryptoBuySell /> },
  { path: "/crypto-exchange", component: <CryptoExchange /> },
  { path: "/crypto-lending", component: <CryptoLending /> },
  { path: "/crypto-orders", component: <CryptoOrders /> },
  { path: "/crypto-kyc-application", component: <CryptoKYCApplication /> },

  // Tasks
  { path: "/tasks-list", component: <TasksList /> },
  { path: "/tasks-kanban", component: <TasksKanban /> },
  { path: "/tasks-create", component: <TasksCreate /> },

  //Invoices
  { path: "/invoices-list", component: <InvoicesList /> },
  { path: "/invoices-detail/:id?", component: <InvoiceDetail /> },

  //Projects
  { path: "/projects-grid", component: <ProjectsGrid /> },
  { path: "/projects-list", component: <ProjectsList /> },
  { path: "/projects-create", component: <ProjectsCreate /> },
  { path: "/projects-overview", component: <ProjectsOverview /> },
  { path: "/projects-overview/:id?", component: <ProjectsOverview /> },


  //Email
  { path: "/email-inbox", component: <EmailInbox /> },
  { path: "/email-read/:id?", component: <EmailRead /> },
  { path: "/email-template-basic", component: <EmailBasicTemplate /> },
  { path: "/email-template-alert", component: <EmailAlertTemplate /> },
  { path: "/email-template-billing", component: <EmailTemplateBilling /> },

  //Contacts
  { path: "/contacts-profile", component: <ContactsProfile /> },
  { path: "/contacts-grid", component: <ContactsGrid /> },
  { path: "/contacts-list", component: <ContactsList /> },


  //job
  { path: "/job-list", component: <JobList /> },
  { path: "/job-apply", component: <ApplyJobs /> },
  { path: "/job-grid", component: <JobGrid /> },
  { path: "/job-details", component: <JobDetails /> },
  { path: "/job-categories", component: <JobCategories /> },
  { path: "/candidate-list", component: <CandidateList /> },
  { path: "/candidate-overview", component: <CandidateOverview /> },


  //Utility
  { path: "/pages-starter", component: <PagesStarter /> },
  { path: "/pages-timeline", component: <PagesTimeline /> },
  { path: "/pages-faqs", component: <PagesFaqs /> },
  { path: "/pages-pricing", component: <PagesPricing /> },

  // Ui
  { path: "/ui-alerts", component: <UiAlert /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-modals", component: <UiModal /> },
  { path: "/ui-offcanvas", component: <UiOffCanvas /> },
  { path: "/ui-rangeslider", component: <UiRangeSlider /> },
  { path: "/ui-progressbars", component: <UiProgressbar /> },
  { path: "/ui-placeholders", component: <UiPlaceholders /> },
  { path: "/ui-tabs-accordions", component: <UiTabsAccordions /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-toasts", component: <UiToasts /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-colors", component: <UiColors /> },
  { path: "/ui-utilities", component: <UiUtilities /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-rating", component: <UiRating /> },
  { path: "/ui-notifications", component: <UiNotifications /> },


  // Forms
  { path: "/form-elements", component: <FormElements /> },
  { path: "/form-layouts", component: <FormLayouts /> },
  { path: "/form-uploads", component: <FormUpload /> },
  { path: "/form-repeater", component: <FormRepeater /> },
  { path: "/form-wizard", component: <FormWizard /> },
  { path: "/form-mask", component: <FormMask /> },
  { path: "/form-advanced", component: <FormAdvanced /> },
  { path: "/form-editors", component: <FormEditors /> },
  { path: "/form-xeditable", component: <FormXeditable /> },
  { path: "/form-validation", component: <FormValidations /> },


  // Tables
  { path: "/tables-basic", component: <BasicTables /> },
  { path: "/tables-datatable", component: <DataTable /> },

  //Charts
  { path: "/apex-charts", component: <ChartApex /> },
  { path: "/e-charts", component: <EChart /> },
  { path: "/sparkline-charts", component: <SparklineChart /> },
  { path: "/re-charts", component: <ReCharts /> },
  { path: "/chartjs-charts", component: <ChartjsChart /> },


  // Icons
  { path: "/icons-boxicons", component: <IconBoxicons /> },
  { path: "/icons-dripicons", component: <IconDripicons /> },
  { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  { path: "/icons-fontawesome", component: <IconFontawesome /> },


  { path: "/maps-google", component: <MapsGoogle /> },
  { path: "/maps-vector", component: <MapsVector /> },
  { path: "/maps-leaflet", component: <MapsLeaflet /> },

  { path: "/profile", component: <UserProfile /> },

  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgotPassword /> },
  { path: "/register", component: <SignUp /> },

  { path: "/pages-maintenance", component: <PagesMaintenance /> },
  { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },
  { path: "/crypto-ico-landing", component: <CryptoIcoLanding /> },

  // // Authentication Inner
  { path: "/pages-login", component: <Login1 /> },
  { path: "/pages-login-2", component: <Login2 /> },
  { path: "/pages-register", component: <Register /> },
  { path: "/pages-register-2", component: <Register2 /> },
  { path: "/page-recoverpw", component: <Recoverpw /> },
  { path: "/page-recoverpw-2", component: <Recoverpw2 /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },
  { path: "/auth-lock-screen-2", component: <LockScreen2 /> },
  { path: "/page-confirm-mail", component: <ConfirmMail /> },
  { path: "/page-confirm-mail-2", component: <ConfirmMail2 /> },
  { path: "/auth-email-verification", component: <EmailVerification /> },
  { path: "/auth-email-verification-2", component: <EmailVerification2 /> },
  { path: "/email-verification", component: <TwostepVerification /> },
  { path: "/auth-two-step-verification-2", component: <TwostepVerification2 /> },
]
export { authProtectedRoutes, publicRoutes };
              
