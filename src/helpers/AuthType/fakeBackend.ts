import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "../url_helper";
import { accessToken, nodeApiToken } from "../jwt-token-access/accessToken";

import {
  events,
  cryptoOrderData,
  invoiceList,
  projects,
  tasks,
  chats,
  users as members,
  userProfile,
  groups,
  contacts,
  messages,
  calenderDefaultCategories,
  customerData,
  orders,
  shops,
  wallet,
  dashboardEarning,
  TopSellingData,
  dashboardEmail,
  jobs,
  jobApply,
  productsData,
  recentProducts,
  comments,
  productListvar,
  productData,
  latestTransaction,
  walletOptions,
  visitor,
  statisticsApplications,
  mailDB,
  jobListCandidate,
  jobsGridData
} from "../../common/data";

let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    email: "admin@themesbrand.com",
  },
];

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

  mock.onPost(url.POST_FAKE_LOGIN).reply(config => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
      usr => usr.email === user.email && usr.password === user.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          resolve([200, validUser[0]]);
        } else {
          reject([
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost(url.POST_FAKE_REGISTER).reply((config: any) => {
    const user = JSON.parse(config["data"]);
    users.push(user);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost("/post-jwt-register").reply((config: any) => {
    const user = JSON.parse(config["data"]);
    users.push(user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost("/post-jwt-login").reply((config: any) => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
      usr => usr.email === user.email && usr.password === user.password
    );
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;

          // JWT AccessToken
          const tokenObj = { accessToken: token }; // Token Obj
          const validUserObj = { ...validUser[0], ...tokenObj }; // validUser Obj

          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost("/post-jwt-profile").reply((config: any) => {
    const user = JSON.parse(config["data"]);

    const one = config.headers;

    let finalToken = one.Authorization;

    const validUser = users.filter(usr => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verify Jwt token from header.Authorization
        if (finalToken === accessToken) {
          if (validUser["length"] === 1) {
            let objIndex: any;

            //Find index of specific object using findIndex method.
            objIndex = users.findIndex(obj => obj.uid === user.idx);

            //Update object's name property.
            users[objIndex].username = user.username;

            // Assign a value to locastorage
            localStorage.removeItem("authUser");
            localStorage.setItem("authUser", JSON.stringify(users[objIndex]));

            resolve([200, "Profile Updated Successfully"]);
          } else {
            reject([400, "Something wrong for edit profile"]);
          }
        } else {
          reject([400, "Invalid Token !!"]);
        }
      });
    });
  });

  mock.onPost("/social-login").reply((config: any) => {
    const user = JSON.parse(config["data"]);
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        if (user && user.token) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;
          const first_name = user.name
          const nodeapiToken = nodeApiToken
          delete user.name

          // JWT AccessToken
          const tokenObj = { accessToken: token, first_name: first_name }; // Token Obj
          const validUserObj = { token: nodeapiToken, "data": { ...tokenObj, ...user } }; // validUser Obj
          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost(url.POST_FAKE_PASSWORD_FORGET).reply((config: any) => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."]);
      });
    });
  });

  mock.onPost(url.POST_EDIT_PROFILE).reply(config => {
    const user = JSON.parse(config["data"]);

    const validUser = users.filter(usr => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {

          let objIndex;

          //Find index of specific object using findIndex method.
          objIndex = users.findIndex(obj => obj.uid === user.idx);
          //Update object's name property.
          users[objIndex].username = user.username;

          // Assign a value to locastorage
          localStorage.removeItem("authUser");
          localStorage.setItem("authUser", JSON.stringify(users[objIndex]));

          resolve([200, users[objIndex]]);
        } else {
          reject([400, "Something wrong for edit profile"]);
        }
      });
    });
  });

  //task
  mock.onGet(url.GET_TASKS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (tasks) {
          // Passing fake JSON data as response
          resolve([200, tasks]);
        } else {
          reject([400, "Cannot get tasks"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_TASKS).reply(user => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.data) {
          // Passing fake JSON data as response
          resolve([200, user.data]);
        } else {
          reject([400, "Cannot add user"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_TASKS).reply((user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.data) {
          // Passing fake JSON data as response
          resolve([200, user.data]);
        } else {
          reject([400, "Cannot update user"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_TASKS).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.data]);
        } else {
          reject([400, "Cannot delete users"]);
        }
      });
    });
  });


  //Contact User Grid
  mock.onGet(url.GET_USERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (members) {
          // Passing fake JSON data as response
          resolve([200, members]);
        } else {
          reject([400, "Cannot get users"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_USERS).reply(user => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.data) {
          // Passing fake JSON data as response
          resolve([200, user.data]);
        } else {
          reject([400, "Cannot add user"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_USERS).reply((user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.data) {
          // Passing fake JSON data as response
          resolve([200, user.data]);
        } else {
          reject([400, "Cannot update user"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_USERS).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.users]);
        } else {
          reject([400, "Cannot delete users"]);
        }
      });
    });
  });

  //Contact Profile 
  mock.onGet(url.GET_USER_PROFILE).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userProfile) {
          // Passing fake JSON data as response
          resolve([200, userProfile]);
        } else {
          reject([400, "Cannot get user profile"]);
        }
      });
    });
  });

  mock.onGet(new RegExp(`${url.GET_EARNING_DATA}/*`)).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { params } = config;
        if (dashboardEarning) {
          const filterChart = dashboardEarning.filter((item: any) => {
            return item.id === params.month;
          });

          const data = filterChart.map((item: any) => item[params.month]);
          // Passing fake JSON data as response
          resolve([200, data[0]]);
        } else {
          reject([400, "Cannot get earning data"]);
        }
      });
    });
  });

  mock.onGet(new RegExp(`${url.TOP_SELLING_DATA}/*`)).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { params } = config;
        if (TopSellingData) {
          const filterChart = TopSellingData.filter((item: any) => {
            return item.id === params.month;
          });

          const data = filterChart.map((item: any) => item[params.month]);
          // Passing fake JSON data as response
          resolve([200, data[0]]);
        } else {
          reject([400, "Cannot get selling data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_JOB_LIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (jobs) {
          // Passing fake JSON data as response
          resolve([200, jobs]);
        } else {
          reject([400, "Cannot get jobs"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_JOB_LIST).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.jobs]);
        } else {
          reject([400, "Cannot delete Jobs List"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_JOB_LIST).reply(job => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (job && job.data) {
          // Passing fake JSON data as response
          resolve([200, job.data]);
        } else {
          reject([400, "Cannot add job"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_JOB_LIST).reply((job) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (job && job.data) {
          // Passing fake JSON data as response
          resolve([200, job.data]);
        } else {
          reject([400, "Cannot update job"]);
        }
      });
    });
  });

  mock.onGet(url.GET_APPLY_JOB).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (jobApply) {
          // Passing fake JSON data as response
          resolve([200, jobApply]);
        } else {
          reject([400, "Cannot get jobsApply"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_APPLY_JOB).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.jobs]);
        } else {
          reject([400, "Cannot delete applyJob"]);
        }
      });
    });
  });

  //job grid
  mock.onGet(url.GET_JOB_GRID).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (jobsGridData) {
          // Passing fake JSON data as response
          resolve([200, jobsGridData]);
        } else {
          reject([400, "Cannot get jobs Grid"]);
        }
      });
    });
  });
  //job condidate list
  mock.onGet(url.GET_CANDIDATE0_LIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (jobListCandidate) {
          // Passing fake JSON data as response
          resolve([200, jobListCandidate]);
        } else {
          reject([400, "Cannot get condidate jobs"]);
        }
      });
    });
  });

  mock.onGet(url.GET_CHATS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (chats) {
          // Passing fake JSON data as response
          resolve([200, chats]);
        } else {
          reject([400, "Cannot get chats"]);
        }
      });
    });
  });

  mock.onGet(url.GET_EVENTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (events) {
          // Passing fake JSON data as response
          resolve([200, events]);
        } else {
          reject([400, "Cannot get events"]);
        }
      });
    });
  });

  mock.onGet(url.GET_CATEGORIES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (calenderDefaultCategories) {
          // Passing fake JSON data as response
          resolve([200, calenderDefaultCategories]);
        } else {
          reject([400, "Cannot get categories"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_EVENT).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot add event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_EVENT).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.event]);
        } else {
          reject([400, "Cannot delete event"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_EVENT).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  // email
  mock.onGet(url.GET_INBOX_MAILS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mailDB.allmail) {
          // Passing fake JSON data as response
          resolve([200, mailDB.allmail]);
        } else {
          reject([400, "Cannot get categories"]);
        }
      });
    });
  });

  mock.onGet(new RegExp(`${url.GET_MAILS_ID}/*`)).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mailDB.allmail) {
          // Passing fake JSON data as response
          const { params } = config;
          const email = mailDB.allmail.find(
            mails => mails.id.toString() === params.id.toString()
          );

          resolve([200, email]);
        } else {
          reject([400, "Cannot get invoice"]);
        }
      });
    });
  });

  mock.onGet(url.SELECT_FOLDER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mailDB.folders) {
          resolve([200, mailDB.folders])
        } else {
          reject([400, "Cannot get folder"])
        }
      })
    })
  })

  mock.onPost(url.GET_SELECTE_MAIL).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        if (config && config.data) {
          const configs = JSON.parse(config.data)
          const data = Object.keys(configs).map(k => parseInt(configs[k]))
          // Passing fake JSON data as response
          resolve([200, data.length > 1 ? data : configs.params])
        } else {
          reject([400, "Cannot add selected mails"])
        }
      })
    })
  })

  mock.onDelete(url.SET_FOLDER_SELECTED_MAILS).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.data]);
        } else {
          reject([400, "Cannot delete data"]);
        }
      });
    });
  });

  mock.onDelete(url.STARED_MAIL).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.mail]);
        } else {
          reject([400, "Cannot delete mail"]);
        }
      });
    });
  });

  mock.onDelete(url.TRASH_MAIL).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.mail]);
        } else {
          reject([400, "Cannot delete mail"]);
        }
      });
    });
  });


  mock.onPut(url.UPDATE_MAIL).reply(mail => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mail && mail.data) {
          const data = JSON.parse(mail.data)

          mailDB.allmail = mailDB.allmail.map(mail => {
            if (mail.id === data.id) {
              return { ...mail, ...data }
            }
            return mail
          })

          resolve([200, data])
        } else {
          reject([400, "Cannot update mail data"])
        }
      })
    })
  })

  mock.onGet(url.GET_CUSTOMERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (customerData) {
          // Passing fake JSON data as response
          resolve([200, customerData]);
        } else {
          reject([400, "Cannot get customers data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_CUSTOMER).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.customer]);
        } else {
          reject([400, "Cannot delete customer"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_CUSTOMER).reply(customer => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (customer && customer.data) {
          // Passing fake JSON data as response
          resolve([200, customer.data]);
        } else {
          reject([400, "Cannot add customer"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_CUSTOMER).reply((customer) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (customer && customer.data) {
          // Passing fake JSON data as response
          resolve([200, customer.data]);
        } else {
          reject([400, "Cannot update customer"]);
        }
      });
    });
  });

  //Shops
  mock.onGet(url.GET_SHOPS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shops) {
          // Passing fake JSON data as response
          resolve([200, shops]);
        } else {
          reject([400, "Cannot get shops data"]);
        }
      });
    });
  });

  //cart
  mock.onGet(url.GET_CART).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (productListvar) {
          // Passing fake JSON data as response
          resolve([200, productListvar]);
        } else {
          reject([400, "Cannot get cart data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_CART).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers.cart) {
          // Passing fake JSON data as response
          resolve([200, config.headers.cart]);
        } else {
          reject([400, "Cannot get cart data"]);
        }
      });
    });
  });

  // crypto 
  mock.onGet(url.GET_WALLET).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (wallet) {
          // Passing fake JSON data as response
          resolve([200, wallet]);
        } else {
          reject([400, "Cannot get wallet data"]);
        }
      });
    });
  });

  //activities
  mock.onGet(url.GET_WALLET_ACTIVITIES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (productData) {
          // Passing fake JSON data as response
          resolve([200, productData]);
        } else {
          reject([400, "Cannot get wallet Activities data"]);
        }
      });
    });
  });

  // Crypto > Orders
  mock.onGet(url.GET_CRYPTO_ORDRER_LIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cryptoOrderData) {
          // Passing fake JSON data as response
          resolve([200, cryptoOrderData]);
        } else {
          reject([400, "Cannot get Order Data"]);
        }
      });
    });
  });

  //Invoices>list
  mock.onGet(url.GET_INVOICES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (invoiceList) {
          // Passing fake JSON data as response
          resolve([200, invoiceList]);
        } else {
          reject([400, "Cannot get invoices"]);
        }
      });
    });
  });

  mock.onGet(new RegExp(`${url.GET_INVOICE_DETAIL}/*`)).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (invoiceList) {
          // Passing fake JSON data as response
          const { params } = config;
          const invoice = invoiceList.find(
            invoice => invoice.id.toString() === params.id.toString()
          );
          resolve([200, invoice]);
        } else {
          reject([400, "Cannot get invoice"]);
        }
      });
    });
  });

  //Projects

  mock.onGet(url.GET_PROJECTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (projects) {
          // Passing fake JSON data as response
          resolve([200, projects]);
        } else {
          reject([400, "Cannot get projects"]);
        }
      });
    });
  });

  mock.onGet(new RegExp(`${url.GET_PROJECT_DETAIL}/*`)).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (projects) {
          // Passing fake JSON data as response
          const { params } = config;
          const project = projects.find(
            product => product.id.toString() === params.id.toString()
          );
          resolve([200, { ...project }]);
        } else {
          reject([400, "Cannot get product detail"]);
        }
      });
    });
  });

  mock.onGet(new RegExp(`${url.GET_DASHBOARD_EMAILCHART}/*`)).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { param } = config;
        if (dashboardEmail) {
          const filterChart = dashboardEmail.filter((item: any) => {
            return item.id === param;
          });
          const data = filterChart.map((item: any) => item[param]);
          // Passing fake JSON data as response
          resolve([200, data[0]]);
        } else {
          reject([400, "Cannot get wallet data"]);
        }
      });
    });
  });

  //latest transaction
  mock.onGet(url.GET_TRANSACTION).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (latestTransaction) {
          // Passing fake JSON data as response
          resolve([200, latestTransaction]);
        } else {
          reject([400, "Cannot get Latest Transaction Data"]);
        }
      });
    });
  });

  // Wallet Balance
  mock.onGet(new RegExp(`${url.GET_WALLENT_BALANCE}/*`)).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (walletOptions) {
          const { params } = config;
          const filteredMessages: any = (walletOptions || []).filter(
            (msg: any) => msg.id.toString() === params.roomId.toString()
          );

          // Passing fake JSON data as response
          resolve([200, filteredMessages]);
        } else {
          reject([400, "Cannot get messages"]);
        }
      });
    });
  });

  // visitors
  mock.onGet(new RegExp(`${url.GET_BLOG_VISITORS}/*`)).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { params } = config;
        if (visitor) {
          const filteredVisitors: any = visitor.filter((msg: any) => msg.id === params.roomId);
          // Passing fake JSON data as response
          resolve([200, filteredVisitors]);
        } else {
          reject([400, "Cannot get messages"]);
        }
      });
    });
  });

  // statistics Applications

  mock.onGet(new RegExp(`${url.GET_STATISTICS_APPLICATION}/*`)).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { params } = config;
        if (statisticsApplications) {
          const filteredVisitors: any = statisticsApplications.filter((msg: any) => msg.id === params.roomId);
          // Passing fake JSON data as response
          resolve([200, filteredVisitors]);
        } else {
          reject([400, "Cannot get messages"]);
        }
      });
    });
  });


  mock.onGet(url.GET_GROUPS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (groups) {
          // Passing fake JSON data as response
          resolve([200, groups]);
        } else {
          reject([400, "Cannot get groups"]);
        }
      });
    });
  });

  mock.onGet(url.GET_CONTACTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (contacts) {
          // Passing fake JSON data as response
          resolve([200, contacts]);
        } else {
          reject([400, "Cannot get contacts"]);
        }
      });
    });
  });

  mock.onGet(new RegExp(`${url.GET_MESSAGES}/*`)).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (messages) {
          // Passing fake JSON data as response
          const { params } = config;
          const filteredMessages = messages.filter(
            msg => msg.roomId === params.roomId
          );
          resolve([200, filteredMessages]);
        } else {
          reject([400, "Cannot get messages"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_MESSAGE).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config.data) {
          // Passing fake JSON data as response
          resolve([200, config.data]);
        } else {
          reject([400, "Cannot add message"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_MESSAGE).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.event]);
        } else {
          reject([400, "Cannot delete event"]);
        }
      });
    });
  });

  mock.onGet(url.GET_ORDERS).reply(() => {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (orders) {
          // Passing fake JSON data as response
          resolve([200, orders]);
        } else {
          reject([400, "Cannot get orders"]);
        }
      });
    });
  });


  mock.onPost(url.ADD_NEW_ORDER).reply(order => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (order && order.data) {
          // Passing fake JSON data as response
          resolve([200, order.data]);
        } else {
          reject([400, "Cannot add order"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_ORDER).reply((order) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (order && order.data) {
          // Passing fake JSON data as response
          resolve([200, order.data]);
        } else {
          reject([400, "Cannot update order"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_ORDER).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.order]);
        } else {
          reject([400, "Cannot delete order"]);
        }
      });
    });
  });

  //Ecommerence Product 
  mock.onGet(url.GET_PRODUCTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (productsData) {
          // Passing fake JSON data as response
          resolve([200, productsData]);
        } else {
          reject([400, "Cannot get Ecommerence-product data"]);
        }
      });
    });
  });

  //Ecommerence product Detailes
  mock.onGet(new RegExp(`${url.GET_PRODUCTS_DETAIL}/*`)).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (productsData) {
          // Passing fake JSON data as response
          const { params } = config;
          const product = productsData.find(
            product => product.id.toString() === params.id.toString()
          );
          resolve([200, { ...product, recentProducts, comments }]);
        } else {
          reject([400, "Cannot get product detail"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_PROJECT).reply((project) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (project && project.data) {
          // Passing fake JSON data as response
          resolve([200, project.data]);
        } else {
          reject([400, "Cannot update project"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_PROJECT).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.project]);
        } else {
          reject([400, "Cannot delete project"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_MAIL).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as responses
          resolve([200, config.headers.mail]);
        } else {
          reject([400, "Cannot delete mail"]);
        }
      });
    });
  });

};

export default fakeBackend;