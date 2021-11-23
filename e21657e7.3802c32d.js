(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{128:function(e,t,i){"use strict";i.r(t),i.d(t,"frontMatter",(function(){return o})),i.d(t,"metadata",(function(){return s})),i.d(t,"toc",(function(){return u})),i.d(t,"Video",(function(){return l})),i.d(t,"default",(function(){return f}));var r=i(3),n=i(7),a=(i(0),i(136)),c=i(137),o={id:"issueACertificate",title:"Issue a certificate"},s={unversionedId:"core_functions/issueACertificate",id:"core_functions/issueACertificate",isDocsHomePage:!1,title:"Issue a certificate",description:"<iframe",source:"@site/docs/core_functions/Issue_a_certificate_d1633b6665a344deacbd308f9704ddbb.mdx",slug:"/core_functions/issueACertificate",permalink:"/opencrvs-core/docs/core_functions/issueACertificate",version:"current",sidebar:"docs",previous:{title:"Validate & register a vital event",permalink:"/opencrvs-core/docs/core_functions/validateRegisterVitalEvent"},next:{title:"Vital statistics export",permalink:"/opencrvs-core/docs/core_functions/vitalStatisticsExport"}},u=[{value:"Configuration",id:"configuration",children:[]},{value:"User Stories",id:"user-stories",children:[]},{value:"Functionality",id:"functionality",children:[{value:"Download to print",id:"download-to-print",children:[]},{value:"Identify who is collecting the certificate",id:"identify-who-is-collecting-the-certificate",children:[]},{value:"Edit certificate content",id:"edit-certificate-content",children:[]},{value:"Print certificate",id:"print-certificate",children:[]}]}],l=function(e){var t=e.url;return Object(a.b)("div",{style:{position:"relative",paddingBottom:"56.25%",height:0}},Object(a.b)("iframe",{src:t,frameBorder:0,webkitallowfullscreen:!0,mozallowfullscreen:!0,allowFullScreen:!0,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}))},d={toc:u,Video:l};function f(e){var t=e.components,i=Object(n.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},d,i,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"This functionality allows either a ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"../system_overview/user_types/registrationAgent"}),"Registration Agent")," or ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"../system_overview/user_types/registrar"}),"Registrar")," to print a certificate, either with or without digital certificates."),Object(a.b)(l,{url:"https://www.loom.com/embed/f04130bd98364626aee0c51bf127d5e7",mdxType:"Video"}),Object(a.b)("h2",{id:"configuration"},"Configuration"),Object(a.b)("p",null,"The certificate can be formatted as per a country's requirements. OpenCRVS also has a ",Object(a.b)("em",{parentName:"p"},"recommended")," certificate based on global best practice."),Object(a.b)("p",null,"The ability to use digital signatures on certificates, print the certificate in advance for handwritten signatures or print on collection."),Object(a.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(a.b)("h5",{parentName:"div"},Object(a.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(a.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(a.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})))),"pro tip")),Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(a.b)("p",{parentName:"div"},"The use of digital signatures has been shown to drastically improve service delivery by reducing the time registration staff need to wait to get handwritten signatures from Registrars. The Audit function effectively tracks every user's actions - this can mitigate the occurrence of any fraudulent activity."))),Object(a.b)("h2",{id:"user-stories"},"User Stories"),Object(a.b)("p",null,"As a ",Object(a.b)("strong",{parentName:"p"},"Registration Agent"),", I want to be able to print a certificate, so that I can collect the signatures of the Registrar before issuance."),Object(a.b)("p",null,"As a ",Object(a.b)("strong",{parentName:"p"},"Registration Agent ",Object(a.b)("em",{parentName:"strong"},"with delegated authority")),", I want to be able to print a certificate with the digital signature of a Registrar, so that I can issue it immediately."),Object(a.b)("p",null,"As a ",Object(a.b)("strong",{parentName:"p"},"Registrar"),", I want to be able to print a certificate, so that I can collect the signatures of the Registrar before issuance."),Object(a.b)("p",null,"As a ",Object(a.b)("strong",{parentName:"p"},"Registrar"),", I want to be able to print a certificate with my digital signature, so that I can issue it immediately."),Object(a.b)("h2",{id:"functionality"},"Functionality"),Object(a.b)("h3",{id:"download-to-print"},"Download to print"),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Low connectivity feature:")," The user is required to download the record that they want to print the certificate for. This prevents overloading bandwidth and affecting the user's ability to print the certificate they need to by downloading all records in the workqueue at once."),Object(a.b)("h3",{id:"identify-who-is-collecting-the-certificate"},"Identify who is collecting the certificate"),Object(a.b)("p",null,"The user is required to identify who is collecting the certificate so that there is a record of who collected it."),Object(a.b)("h3",{id:"edit-certificate-content"},"Edit certificate content"),Object(a.b)("p",null,"If the user wants to edit the content of the certificate before printing, they can do so to prevent future change requests for the applicant. This action is captured in the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"../support_functions/audit"}),"audit")," function."),Object(a.b)("h3",{id:"print-certificate"},"Print certificate"),Object(a.b)("p",null,"When the user chooses to print the certificate, it opens in a new tab in PDF format. From this page, the user can print using the device's printer."),Object(a.b)("p",null,"The certificate can be printed with a digital signature in advance or on collection."),Object(a.b)("img",{alt:"Print_certificate",src:Object(c.a)("assets/core_functions/Issue_a_certificate_d1633b6665a344deacbd308f9704ddbb/Print_certificate.png")}))}f.isMDXComponent=!0},136:function(e,t,i){"use strict";i.d(t,"a",(function(){return d})),i.d(t,"b",(function(){return p}));var r=i(0),n=i.n(r);function a(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function c(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function o(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?c(Object(i),!0).forEach((function(t){a(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function s(e,t){if(null==e)return{};var i,r,n=function(e,t){if(null==e)return{};var i,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)i=a[r],t.indexOf(i)>=0||(n[i]=e[i]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)i=a[r],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}var u=n.a.createContext({}),l=function(e){var t=n.a.useContext(u),i=t;return e&&(i="function"==typeof e?e(t):o(o({},t),e)),i},d=function(e){var t=l(e.components);return n.a.createElement(u.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},b=n.a.forwardRef((function(e,t){var i=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=l(i),b=r,p=d["".concat(c,".").concat(b)]||d[b]||f[b]||a;return i?n.a.createElement(p,o(o({ref:t},u),{},{components:i})):n.a.createElement(p,o({ref:t},u))}));function p(e,t){var i=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=i.length,c=new Array(a);c[0]=b;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,c[1]=o;for(var u=2;u<a;u++)c[u]=i[u];return n.a.createElement.apply(null,c)}return n.a.createElement.apply(null,i)}b.displayName="MDXCreateElement"},137:function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"a",(function(){return c}));var r=i(22),n=i(138);function a(){var e=Object(r.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,i=void 0===t?"/":t,a=e.url;return{withBaseUrl:function(e,t){return function(e,t,i,r){var a=void 0===r?{}:r,c=a.forcePrependBaseUrl,o=void 0!==c&&c,s=a.absolute,u=void 0!==s&&s;if(!i)return i;if(i.startsWith("#"))return i;if(Object(n.b)(i))return i;if(o)return t+i;var l=i.startsWith(t)?i:t+i.replace(/^\//,"");return u?e+l:l}(a,i,e,t)}}}function c(e,t){return void 0===t&&(t={}),(0,a().withBaseUrl)(e,t)}},138:function(e,t,i){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function n(e){return void 0!==e&&!r(e)}i.d(t,"b",(function(){return r})),i.d(t,"a",(function(){return n}))}}]);