(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{136:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return m}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function b(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=r.a.createContext({}),s=function(e){var t=r.a.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):b(b({},t),e)),a},p=function(e){var t=s(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},O=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,c=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),p=s(a),O=n,m=p["".concat(c,".").concat(O)]||p[O]||d[O]||i;return a?r.a.createElement(m,b(b({ref:t},l),{},{components:a})):r.a.createElement(m,b({ref:t},l))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,c=new Array(i);c[0]=O;var b={};for(var o in t)hasOwnProperty.call(t,o)&&(b[o]=t[o]);b.originalType=e,b.mdxType="string"==typeof e?e:n,c[1]=b;for(var l=2;l<i;l++)c[l]=a[l];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,a)}O.displayName="MDXCreateElement"},70:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return b})),a.d(t,"toc",(function(){return o})),a.d(t,"default",(function(){return s}));var n=a(3),r=a(7),i=(a(0),a(136)),c={id:"technicalInteroperability",title:"Technical interoperability"},b={unversionedId:"technology/technicalInteroperability",id:"technology/technicalInteroperability",isDocsHomePage:!1,title:"Technical interoperability",description:"By using FHIR as a standard for our NoSQL datastore Hearth and interoperability layer OpenHIM, OpenCRVS seamlessly connects civil registration to health services and other systems. We can receive birth and death notifications from the hospital setting and expose registration events to any other technical system, such as National ID, via our FHIR standard API gateways in OpenHIM.",source:"@site/docs/technology/Technical_Interoperability.mdx",slug:"/technology/technicalInteroperability",permalink:"/opencrvs-core/docs/technology/technicalInteroperability",version:"current",sidebar:"docs",previous:{title:"Technical configuration",permalink:"/opencrvs-core/docs/technology/technicalConfiguration"},next:{title:"Webhook integration",permalink:"/opencrvs-core/docs/technology/webhooks"}},o=[{value:"Register a system client",id:"register-a-system-client",children:[]},{value:"Deactivate a system client",id:"deactivate-a-system-client",children:[]},{value:"Reactivate a deactivated system client",id:"reactivate-a-deactivated-system-client",children:[]},{value:"Request an access token",id:"request-an-access-token",children:[]},{value:"Interoperability via OpenHIM and FHIR",id:"interoperability-via-openhim-and-fhir",children:[]},{value:"Example integrations",id:"example-integrations",children:[]}],l={toc:o};function s(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},l,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"By using ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://hl7.org/FHIR/"}),"FHIR")," as a standard for our NoSQL datastore ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/jembi/hearth"}),"Hearth")," and interoperability layer ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"http://openhim.org/"}),"OpenHIM"),", OpenCRVS seamlessly connects civil registration to health services and other systems. We can receive birth and death notifications from the hospital setting and expose registration events to any other technical system, such as National ID, via our FHIR standard API gateways in OpenHIM."),Object(i.b)("p",null,"To integrate with OpenCRVS, the recommended approach is to host a microservice on your platform that can interact with OpenHIM. This microservice is referred to as a ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"./mediators"}),"mediator"),"."),Object(i.b)("p",null,"A mediator, with the right scope and permissions can interact with existing endpoints in the OpenCRVS stack. But the most logical integration point is to subscribe to OpenCRVS ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"./webhooks"}),"Webhooks"),"."),Object(i.b)("p",null,"To set up a mediator with the right permissions there is no GUI, your system administrator is required to:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"SSH into the OpenCRVS manager node and register a new system client. Described below."),Object(i.b)("li",{parentName:"ol"},"Securely host the system ",Object(i.b)("inlineCode",{parentName:"li"},"client_id"),", ",Object(i.b)("inlineCode",{parentName:"li"},"client_secret")," and ",Object(i.b)("inlineCode",{parentName:"li"},"sha_secret"),", returned in the registration process, as environment variables or secrets that your mediator or webhook subscriber service has secure access to.")),Object(i.b)("p",null,"Your mediator microservice is then required to:"),Object(i.b)("ol",{start:3},Object(i.b)("li",{parentName:"ol"},"Authenticate and request an access token. Described below."),Object(i.b)("li",{parentName:"ol"},"Develop a ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"./mediators"}),"mediator")," or ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"./webhooks"}),"webhook subscriber")," to perform your required business functions. We expose some OpenCRVS events as Webhooks which can be a good way to interact immediately if the supported events are of interest to you.")),Object(i.b)("h3",{id:"register-a-system-client"},"Register a system client"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"In the upcoming OpenCRVS Beta release the following process will be deprecated and replaced by a GUI in the System Administrator User Team Management functionality.")),Object(i.b)("p",null,"Using a valid system administrator JWT token returned during OpenCRVS client authentication, SSH into your manager instance and run the following commands to register a new client."),Object(i.b)("p",null,"Find a running auth service Docker container ID. NOTE: You may need to connect to a worker node if auth is not running on the manager."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),"docker ps -a\n")),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),'docker exec <Insert auth service container id on node> \\\nwget -S --header="Authorization: Bearer <Insert your valid system administrator JWT here>" \\\n--header=\'Accept-Charset: UTF-8\' --header=\'Content-Type: application/json\' \\\n--post-data \u2018{"scope":"NATIONAL_ID"}\' \\\n-O - http://user-mgnt:3030/registerSystemClient\n')),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Request payload")),Object(i.b)("p",null,"Example json"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),'{\n    "scope": "NATIONAL_ID",\n}\n')),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Parameter"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Sample value"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"scope")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"NATIONAL_ID")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Available integration scopes currently include: ",Object(i.b)("strong",{parentName:"td"},"NATIONAL_ID")," ",Object(i.b)("strong",{parentName:"td"},"HEALTH")," ",Object(i.b)("strong",{parentName:"td"},"AGE_CHECK")," ",Object(i.b)("strong",{parentName:"td"},"EXTERNAL_VALIDATION"),".")))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Request Response")),Object(i.b)("p",null,"The command will return the following details:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),'\n{\n    "client_id": "2fd153ab-86c8-45fb-990d-721140e46061",\n    "client_secret": "8636abe2-affb-4238-8bff-200ed3652d1e",\n    "sha_secret": "d04aec67-1ef4-467a-a5a8-fa5c89ad71ce"\n}\n\n')),Object(i.b)("p",null,"These are your authentication, and webhook payload verification details for your API and should be stored securely in line with your organisation's security policies and never exposed in code repositories."),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Parameter"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Sample value"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"client_id")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"2fd153ab-86c8-45fb-990d-721140e46061")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"The client id used in the authentication process for system clients.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"client_secret")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"8636abe2-affb-4238-8bff-200ed3652d1e")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"The client secret used in the authentication process for system clients.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"sha_secret")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"d04aec67-1ef4-467a-a5a8-fa5c89ad71ce")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"The ",Object(i.b)("strong",{parentName:"td"},"SHA1")," signature used when verifying that a webhook payload is genuine")))),Object(i.b)("h3",{id:"deactivate-a-system-client"},"Deactivate a system client"),Object(i.b)("p",null,"Using a valid system administrator JWT token returned during OpenCRVS client authentication, SSH into your manager instance and run the following commands to deactivate an existing client:"),Object(i.b)("p",null,"Find a running auth service Docker container ID. NOTE: You may need to connect to a worker node if auth is not running on the manager."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),"docker ps -a\n")),Object(i.b)("p",null,"Run the following command replacing the client_id with the client_id you wish to deactivate. You can browse the ",Object(i.b)("strong",{parentName:"p"},"user-mgnt > systems")," collection in Mongo to find the client details."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),"docker exec <Insert auth service container id on node> \\\nwget -S --header=\"Authorization: Bearer <Insert your valid JWT here>\" \\\n--header='Accept-Charset: UTF-8' --header='Content-Type: application/json' \\\n--post-data '{\"client_id\":\"2fd153ab-86c8-45fb-990d-721140e46061\"}' \\\n-O - http://user-mgnt:3030/deactivateSystemClient\n")),Object(i.b)("h3",{id:"reactivate-a-deactivated-system-client"},"Reactivate a deactivated system client"),Object(i.b)("p",null,"Using a valid system administrator JWT token returned during OpenCRVS client authentication, SSH into your manager instance and run the following commands to reactivate a previously deactivated client:"),Object(i.b)("p",null,"Find a running auth service Docker container ID. NOTE: You may need to connect to a worker node if auth is not running on the manager."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),"docker ps -a\n")),Object(i.b)("p",null,"Run the following command replacing the client_id with the client_id you wish to reactivate. You can browse the ",Object(i.b)("strong",{parentName:"p"},"user-mgnt > systems")," collection in Mongo to find the client details."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),"docker exec <Insert auth service container id on node> \\\nwget -S --header=\"Authorization: Bearer <Insert your valid JWT here>\" \\\n--header='Accept-Charset: UTF-8' --header='Content-Type: application/json' \\\n--post-data '{\"client_id\":\"2fd153ab-86c8-45fb-990d-721140e46061\"}' \\\n-O - http://user-mgnt:3030/reactivateSystemClient\n")),Object(i.b)("h3",{id:"request-an-access-token"},"Request an access token"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"URL")),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),"POST https://auth.<your-open-crvs-host.com>/authenticateSystemClient\n")),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Request payload")),Object(i.b)("p",null,"Example json"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),'{\n    "client_id": "2fd153ab-86c8-45fb-990d-721140e46061",\n    "client_secret": "8636abe2-affb-4238-8bff-200ed3652d1e"\n}\n')),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Parameter"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Sample value"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"client_id")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"2fd153ab-86c8-45fb-990d-721140e46061")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"The client id used in the authentication process for system clients.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"client_secret")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"8636abe2-affb-4238-8bff-200ed3652d1e")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"The client secret used in the authentication process for system clients.")))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Request Response")),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),'{\n    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6Ikp...",\n}\n')),Object(i.b)("p",null,"The token is a ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://jwt.io/"}),"JWT")," containing with the following structure and must be included as an ",Object(i.b)("inlineCode",{parentName:"p"},"Authorization: Bearer <token>")," in all future requests:"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Token Header")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Parameter"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Sample value"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"alg")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"RS256")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Signing algorithm.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"typ")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"JWT")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"This value is always ",Object(i.b)("inlineCode",{parentName:"td"},"JWT"),".")))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Token Payload")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Parameter"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Sample value"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"scope")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"['health']")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"An array of OpenCRVS roles for authorization permissions to access. These are defined as a feature of the OpenCRVS core. Approved scopes are ",Object(i.b)("inlineCode",{parentName:"td"},"health"),", ",Object(i.b)("inlineCode",{parentName:"td"},"nationalId"),", ",Object(i.b)("inlineCode",{parentName:"td"},"ageCheck"),". If you require a new scope, please open a feature request")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"iat")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"1593712289")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"When the JWT was created.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"exp")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"1594317089")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"When the JWT expires - For System clients this is set to 10 minutes by default, but this is configurable in the resources package.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"aud")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"['opencrvs.auth']")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"An array of services that will respond to this JWT.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"iss")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"'opencrvs.auth'")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"The issuing service of the JWT.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"sub")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"'5ee75eb2104ccf88d9ac0c3d'")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Equal to the user or system id.")))),Object(i.b)("h2",{id:"interoperability-via-openhim-and-fhir"},"Interoperability via OpenHIM and FHIR"),Object(i.b)("p",null,Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"http://openhim.org/"}),"OpenHIM")," is our pass-through, publish/subscribe middleware for all civil registration process events, tracking and exposing them as ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"./webhooks"}),"Webhooks"),", via authenticated API integrations - ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"./mediators"}),"OpenHIM Mediators"),"."),Object(i.b)("p",null,Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://hl7.org/FHIR/"}),"FHIR")," was created by ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"http://hl7.org/"}),"Health Level Seven International (HL7)")," a not-for-profit, ANSI-accredited standards developing organization dedicated to providing a comprehensive framework and related standards for the exchange, integration, sharing and retrieval of electronic health information that supports clinical practice and the management, delivery and evaluation of health services."),Object(i.b)("p",null,"We designed FHIR standards for Civil Registration and look forward to submitting them to HL7 for inclusion in the next version of FHIR."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/jembi/opencrvs-fhir-templates/blob/master/birth-notification/fhir-document.jsonc"}),"Event notification")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/jembi/opencrvs-fhir-templates/blob/master/birth-registration/fhir-document.jsonc"}),"Birth registration")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/jembi/opencrvs-fhir-templates/blob/master/death-registration/fhir-document.jsonc"}),"Death registration"))),Object(i.b)("h2",{id:"example-integrations"},"Example integrations"),Object(i.b)("p",null,Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"./mediators"}),"Mediators")," can be built in any technology due to being containerised microservices, and can convert in real-time, any data format to and from ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://hl7.org/FHIR/"}),"FHIR")," and we have an example of these integrations into ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.dhis2.org/"}),"DHIS2")," and National ID in operation in Bangladesh."),Object(i.b)("p",null,"A simple mediator exposing the age of a child to a 3rd party application, (in this case a Telegram / WhatsApp ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/opencrvs/opencrvs-zambia/tree/master/src/zmb/chatbot"}),"chatbot")," used to verify if a child is old enough to be married) is available ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/opencrvs/opencrvs-zambia/tree/master/src/zmb/mediators/ocrvs-chatbot"}),"here"),"."),Object(i.b)("p",null,"You can read more about the functional interoperability requirements ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"../system_overview/interoperability"}),"here")),Object(i.b)("p",null,"You can read more regarding record verification ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"../core_functions/recordVerification"}),"here")),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"MOSIP Example")),Object(i.b)("p",null,"A technical proof of concept ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"./mediators"}),"mediator")," that exposes civil registration events via a ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"./webhooks"}),"Webhook")," to the ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.mosip.io/"}),"MOSIP - the Modular Open Source Identity Platform")," is documented on the mediator and webhooks page, along with links to the code."),Object(i.b)("p",null,"This integration represents A FHIR standardised approach to ensuring that a birth registration directly creates a National ID number with optional biometrics.\nThis interoperability ensures that the legal identity established at birth is then utilised as a foundational identity to access other services (e.g. health, education, financial inclusion, passport, mobile phone etc.) and to ensure that we leave no one behind."))}s.isMDXComponent=!0}}]);