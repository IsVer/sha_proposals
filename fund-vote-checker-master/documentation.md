# Fund-vote-checker documentation

This code base is structured in a frontend and a backend folder.
Important overall instructions and installation guides will be in this folder.
More specific instructions will be in README.md files in the specific folders.


## Step-by-step instructions

### 0. Structure

`terminal @ <root-folder>`

```bash
mkdir frontend
mkdir backend
```

### 1. Frontend

#### 1. Install nuxt with vuetify.js module:

[Nuxt getting started page](https://nuxtjs.org/guide/installation)

`terminal @ /frontend`

```bash
cd frontend
npx create-nuxt-app nuxt

---
Configuration dialog selections:
---

? Choose the package manager        Npm
? Choose UI framework               Vuetify.js
? Choose custom server framework    None (Recommended)
? Choose Nuxt.js modules            Axios
? Choose linting tools              None
? Choose test framework             None
? Choose rendering mode             Universal (SSR)
? Choose development tools          jsconfig.json (Recommended for VS Code)


---
🎉  Successfully created project portfolio-test

  To get started:

        cd nuxt
        npm run dev
---

```

#### 2. Get familiar with the @nuxtjs/vuetify module

The vuetify module comes with its own configuration inside the nuxt.config.js. You can find more information here: [Vuetify module @GitHub](https://github.com/nuxt-community/vuetify-module)

For us it’s important to know that vuetify is integrated into the nuxt config in two places:

`frontend/nuxt/nuxt.config.js`

```js
buildModules: ["@nuxtjs/vuetify"],
// …
vuetify: {
    customVariables: ["~/assets/scss/vuetify-variables.scss"],
    theme: {
      dark: false, // was true before
      themes: {
        light: {
          // https://vuetifyjs.com/en/customization/theme
          primary: "#004882", // galileo primary color
          background: colors.grey.lighten5, // background color for the page: a very light grey
          environmental: "#81C784", // E
          social: "#e25f68", // S
          governance: "#4a5b7e", // G
          accent: colors.pink.darken3, // all others have to be matched later
          secondary: colors.amber,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
// …
```




#### 3. Adjusting the scaffold

To get things started I’d suggest to rearrange the scaffold a bit
[Getting started / layouts vuetify](https://vuetifyjs.com/en/getting-started/pre-made-layouts)

I’m using the [baseline flipped](https://github.com/vuetifyjs/vuetify/tree/master/packages/docs/src/layouts/layouts/demos/baseline-flipped.vue) layout and for now I want to set this as a layout in nuxt.

So I’m going to replace the
`frontend/nuxt/layouts/default.vue`

```html
<template>
  <v-app id="default-layout">
    <v-app-bar
      app
      color="background"
      clipped-left
      :collapse-on-scroll="true"
      :elevate-on-scroll="true"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />

      <v-toolbar-title>
        <v-img
          src="/img/gga_logo_retina.png"
          alt="Galileo Logo"
          height="25"
          width="120"
          contain
        ></v-img>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      color="background"
      v-model="drawer"
      app
      clipped
      floating
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Intoduction</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Fund vote checker</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <nuxt />
    </v-content>

    <!-- <v-footer color="secondary" app dark>
      <v-spacer />
      <span>&copy; 2020</span>
    </v-footer>-->
  </v-app>
</template>

<script>
  export default {
    name: "LayoutMinimalLogo",
    props: {
      source: String
    },
    data: () => ({
      drawer: false
    })
  };
</script>
```

In this way the main junk of the markup is in the layout and for my routes in the pages folder I can add the content in the content container.

> Later it will definitely make sense to **modularize** this further and make the navigation-drawer a component for example

To clean up further I deleted the extra components I don’t need any more in the `frontend/nuxt/components` folder and replaced the pages in the `frontend/nuxt/pages` folder to just one page:

`frontend/nuxt/pages/index.vue`

```html
<template>
  <div>
    <h1>Welcome to your Vuetify project</h1>
  </div>
</template>
```

Right now I’m mainly working in the `pages/index.vue` file and annotated an example setup. For the next steps this should rather be structured in more components. 

---

---

---

---

### 2. Switching to the backend

First we want to setup a Amazon RDS with PostGRES and then connect it to an Amazon API Gateway.

The connection between static hosting and the API will be a lambda function.
To start we will allow things to be public and later restrict access with AWS users / groups security policies etc.

#### 1. Let’s set up the RDS and populate in a jupyter notebook!

We’ll roughly follow this guide, with some modifications:

**WARNING!!!** – The process of setting up a security group so you can access the database from your local machine is not documented here.

**WARNING 2** – In the linked tutorial there’s a code snippet that throws an error. I haven’t managed to correct that one in the best way, that means for the population you will need a csv file without a header row.

**After Step 1** of the
[AWS RDS setup tutorial](https://towardsdatascience.com/amazon-rds-step-by-step-guide-14f9f3087d28) come back here to do this step 1!

This is what I did:

1. **Make sure you can access your DB!**

- In AWS go to **EC2**
- In the left drawer under NETWORK & SECURITY navigate to Security Groups
- Check create **Security Group**

  - Give it a name and description (for example: local_rds_access)
  - Add an Inbound rule with theses parameters:
  - **Port Range**: 5432 (default postgres port, should match your postgres instance, if not you have to adjust one of them to create a match)
  - **Source**: Select my IP – it will automatically input your IP address
  - Hit **Create**

- In AWS got to **RDS**
- Select the RDS **database instance** you created
- Select the top right grey **Modify** button
- At the **Network & Security** card add your created security group
- Then press the orange **Continue** button at the bottom of the page
- Then you can review the changes
- Make sure you check the **Apply immediately** radio button
- Click on **Modify DB Instance**

2. Now you can go back to the tutorial, or just follow along here:

I’ll extend our backend structure a bit:

`terminal @ backend/strapi`

```bash
cd ..
cd ..
cd backend
mkdir python
mkdir data
mkdir data/mockup
cd python
jupyter notebook
```

In jupyter notebook we’ll establish a connection to our data base with psycopg2.

> This is the most direct/basic way to do this. **[SQL alchemy](https://www.sqlalchemy.org/)** might offer additional options
> If performance becomes an issue – here’s a [performance comparison](https://www.codementor.io/@bruce3557/graceful-data-ingestion-with-sqlalchemy-and-pandas-pft7ddcy6)

`jupyter notebook @ backend/python/populate_db.ipynb`

```python
import psycopg2
connection = psycopg2.connect(
    host = 'your_RDB_AWS_instance_Endpoint',
    port = 5432,
    user = 'YOUR_USER_NAME',
    password = 'YOUR_PASSWORD',
    database='YOUR_DATABASE_NAME'
    )
cursor=connection.cursor()
```

This is how you can create a table (which is basically just passing a SQL command with psycopg2)

```python
#creating table funds

cursor.execute("""CREATE TABLE funds(
id SERIAL PRIMARY KEY,
fund text,
fund_manager text)""")

connection.commit()
```

To check if everything worked we can use pandas to send a query:

```python
# using pandas to execute SQL queries
import pandas as pd

sql = """
SELECT "table_name","column_name", "data_type", "table_schema"
FROM INFORMATION_SCHEMA.COLUMNS
WHERE "table_schema" = 'public'
ORDER BY table_name
"""
pd.read_sql(sql, con=connection)
```

Prepare a csv file like this. **ATTENTION** – no header row. _TODO – fix this in the future for convenience_

```csv
1,bra,BlackRock
2,brb,BlackRock
3,brc,BlackRock
4,brd,BlackRock
5,ssa,State Street
6,ssb,State Street
7,ssc,State Street
8,ssd,State Street
9,va,Vanguard
10,vb,Vanguard
11,vc,Vanguard
12,vd,Vanguard
```

And use it to populate the table

```python
# Populate the table with data

with open('../data/mockup/funds_test.csv', 'r') as row:
    cursor.copy_from(row, 'funds', sep=',')
connection.commit()
```

Finally check if everything worked:

```python
# Check if it worked

sql = """
SELECT *
FROM funds
WHERE fund_manager='BlackRock'
"""

pd.read_sql(sql, con=connection)

## Expected output:
'''
	id	fund	fund_manager
0	1	bra	BlackRock
1	2	brb	BlackRock
2	3	brc	BlackRock
3	4	brd	BlackRock
'''
```

We can close the jupyter notebook for now, we will only need it again if we’re changing the data


### This is helpful: 

<template v-slot:append-outer>
          <v-slide-x-reverse-transition
            mode="out-in"
          >
            <v-icon
              :key="`icon-${isEditing}`"
              :color="isEditing ? 'success' : 'info'"
              @click="isEditing = !isEditing"
              v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
            ></v-icon>
          </v-slide-x-reverse-transition>