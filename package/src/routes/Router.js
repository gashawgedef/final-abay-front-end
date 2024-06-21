import { lazy } from "react";
import { Navigate,Redirect } from "react-router-dom";
import PriceTable from "../views/tables/PriceTable.js";
 import AddBenefit from "../views/dashboards/dashboard1-components/AddBenfit.js";
 import AddExcel from "../views/dashboards/dashboard1-components/AddExcel.js";
import ProtectedRoute from "../views/ProtectedRoute.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));
const Login = lazy(() => import("../views/dashboards/SignIn.js"));
/*****Tables******/
const BasicTable = lazy(() => import("../views/tables/BasicTable.js"));
const TaxList = lazy(() => import("../views/dashboards/dashboard1-components/TaxList.js"));
const TaxReport = lazy(() => import("../views/dashboards/dashboard1-components/TaxReport.js"));
const EmployeeTin = lazy(() => import("../views/dashboards/dashboard1-components/EmployeeTin.js"));

// form elements
const ExAutoComplete = lazy(() =>
  import("../views/FormElements/ExAutoComplete.js")
);
const ExButton = lazy(() => import("../views/FormElements/ExButton.js"));
const ExCheckbox = lazy(() => import("../views/FormElements/ExCheckbox.js"));
const ExRadio = lazy(() => import("../views/FormElements/ExRadio.js"));
const ExSlider = lazy(() => import("../views/FormElements/ExSlider.js"));
const ExSwitch = lazy(() => import("../views/FormElements/ExSwitch.js"));
// form layouts
const FormLayouts = lazy(() => import("../views/FormLayouts/FormLayouts.js"));
const isLoggedIn=false;
/*****Routes******/
const ThemeRoutes = [
  { path: "/", exact: true, element: <Navigate to="/login" /> },
  {
    path: "/",
    element:  <ProtectedRoute>{<FullLayout />}</ProtectedRoute>,
    children: [
      { path: "dashboards/dashboard1", exact: true, element: <Dashboard1 /> },
      { path: "dashboards/tax-list", element: <TaxList /> },
      { path: "dashboards/tin-list", element: <EmployeeTin/> },
      { path: "dashboards/tax-report", element: <TaxReport /> },
      { path: "tables/basic-table", element: <BasicTable /> },
      { path: "tables/price-table", element: <PriceTable /> },
      { path: "tables/add-benefit", element: <AddBenefit /> },
      { path: "tables/AddExcel", element: <AddExcel /> },
      { path: "/form-layouts/form-layouts", element: <FormLayouts /> },
      { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
      { path: "/form-elements/button", element: <ExButton /> },
      { path: "/form-elements/checkbox", element: <ExCheckbox /> },
      { path: "/form-elements/radio", element: <ExRadio /> },
      { path: "/form-elements/slider", element: <ExSlider /> },
      { path: "/form-elements/switch", element: <ExSwitch /> },
    ],
  },
  {
    path: "/login",
    exact: true,
    element: <Login />,
  },
];

export default ThemeRoutes;