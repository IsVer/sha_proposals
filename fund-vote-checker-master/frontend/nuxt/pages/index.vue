<template>
  <!-- v-container is the basic page container in vuetify -->
  <!-- "fluid" is an attribute that sizes the container to the full page width -->
  <!-- A v-container has a default padding, which we remove, 
  because we’ll use one more nesting of containers-->
  <!-- the pa-0 class stands for "Padding All Zero" -->
  <!-- On spacing classes: https://vuetifyjs.com/en/styles/spacing -->
  <!-- <v-container class="pa-0" fluid> -->
  <v-container class="pa-0" fluid>
    <!-- a regular container is not scaled to the full width on larger screens and centered -->
    <v-parallax src="/img/bluecomps.png">

        <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-left" cols="8">
          <h1 class=" font-weight-thin mb-10">
              <span class="font-weight-black">Do you own stock? </span> 
              <br><br> How to start a conversation with the company you invested in
        </h1> 
      </v-col>
    </v-row>


    </v-parallax>

    <v-container>
      <!-- Vuetify’s grid system works with rows (v-row) and columns (v-col) -->
      <!-- https://vuetifyjs.com/en/components/grids#grid-system -->
      <!-- In v-row there are shortcuts to flexbox css attributes available -->
      <!-- align for vertical; justify for horizontal positioning -->
  
      <v-row justify="center">
        <v-col cols="12" lg="12">

      <!-- <v-row style="height:calc(100vh - 110px)" align="center">
        <transition name="fade-slow">
          <v-col v-if="isHydrated">
          </v-col>
        </transition>
      </v-row> -->
          <p class="text-justify ">
            As a shareholder you get to vote on resolutions (also called proposals) presented at a company’ shareholder meeting. Most resolutions at shareholder meetings are from the companies’ management. These are covering routine issues like the election of board members, or approval of a company’s accountancy firm - oftentimes uncontroversial and supported by most shareholders. 
          </p>

          <p class=" text-justify ">
            Other agenda items are more contended. Besides voting, shareholders can also submit proposals. Every year in the U.S., there are about 400 resolutions filed on environmental, social, and sustainability governance topics. These shareholder proposals are a formal way to ask the company to act on something. Some of these proposals make it to the proxy ballot, for all stockholders to vote on.
          </p>

          <h2 class="text-justify font-weight-thin">
            You could also submit a proposal to the ballot yourself. 
          </h2>
          <p class=" text-justify ">
          Let us walk you through the process of submitting a shareholder proposal.
          </p>

      <p class=" text-justify ">
         <span class=" font-weight-black " > Can I do that? </span> To submit a shareholder proposal to a company’s proxy ballot you should
            own more than $2,000 in shares or 1% of the company (the 1% in shares can be less than $2,000 in value, but that is not common);
            have owned this stake continuously for at least a full year before you submit the proposal; 
            make sure to continue to hold this stake when proposals may be brought for a vote.
          </p>

      <p class=" text-justify ">
          <span class=" font-weight-black " > Ok. I qualify. How can I proof that? </span> 
          Get a written statement from your broker or bank showing that you have had the minimum stake for at least one year when you submit the proposal. (This should be an official holder of your “record”, called a <a href='https://www.investopedia.com/terms/d/dtc.asp'> Depository Trust Company </a> (“DTC”) participant.)
          </p>
        </v-col>
      </v-row>

      
      <v-row justify="center">
        <!-- With cols="10" we can set a narrower container on the page -->
        <v-col cols="12" lg="10">
          <!-- It’s also possible to nest v-cols and v-rows -->
          <v-row justify="center">
            <!-- Are we make a even narrower container -->
            <v-col cols="12" sm="10" md="7">
              <p class="font-weight-black">  
              Before you start writing, few important details. <br><br>
                <span class="font-weight-regular"
                  >
                  <ol> 
                  <li> Get the submission deadline from the company’s investor relations contact person. The proposal should be submitted at least 120 days before the anniversary date of the company's proxy statement that was sent out for the previous annual meeting (but the company might not have had a shareholder meeting last year, or changed its date, so check with the company). </li>
                  <li> Your proposal can be max 500 words. </li>
                  </ol></span>
              </p>
              <p> Ok, let’s say you submitted your proposal. Few things can happen before the shareholder meeting.</p>
            </v-col>
          </v-row>


        <v-row class="mt-4" justify="center">
            <!-- With cols="1" and cols="6" we split up the 7 columns we used above -->
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <!-- This is how you can use an icon -->
              <!-- https://vuetifyjs.com/en/customization/icons#icons -->
              <!-- you can size it by just using these attributes:
              (x-small, small, medium (default), large, and x-large)
              without a value-->
              <!-- By default you can use these icons: https://materialdesignicons.com/ -->

            </v-col>

            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold"
                  >In the last decade, many people invested through index
                  funds.</span
                >

                The rise of this passive approach to investing is one of the
                most remarkable developments in financial markets since the
                crisis. Passive investing democratizes financial markets; it
                offers the general public an affordable option to gain from
                capital markets, without taking too much risk. But now, index
                funds become so large that collectively, they represent the
                largest shareholder. This is raising new issues about the
                influence of index funds on corporates.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="secondary"
                >mdi-comment-search</v-icon
              >
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold">
                  Shareholders can participate in the strategic course of a
                  company by voting on issues
                </span>
                Not every proxy item is interesting. In fact, most of them are
                not. The majority of items are proposals from management,
                covering routine matters like the ratification of auditors or
                the election of board members. Fewer, but more contentious, are
                the proposals submitted by shareholders who like to see the
                company take a specific action. Some hedge funds are known for
                their shareholder activism; for example seeking to replace board
                members with their own candidates.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="primary">mdi-earth</v-icon>
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold">
                  Other shareholder activism is oriented at environmental,
                  social or governance change in corporates.
                </span>
                At the upcoming shareholder meeting of Amazon, Inc. in May 2020
                for instance, shareholder activists (backed by employees)
                <a
                  href="https://www.sec.gov/Archives/edgar/data/1018724/000119312519102995/d667736ddef14a.htm"
                  >ask Amazon to report publicly on how it plans to reduce its
                  reliance on fossil fuels</a
                >
                and manage the risks posed by climate change. The index funds in
                your 401(k) will be voting on that - on behalf of you.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon
                x-large
                class="mt-n4"
                color="secondary"
                style="transform: rotate(180deg)"
                >mdi-navigation</v-icon
              >
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold">
                  Funds are obliged to publish each vote they cast.
                </span>
                But the format of these filings is everything but accessible.
                The more interesting information is buried between the lines;
                few people will scroll through thousands of votes. We therefore
                made a tool that does this for you.
                <span class="font-weight-bold">
                  The Fund Checker provides a peak on how your funds voted
                  across 10 years of voting on environmental, social and
                  governance shareholder proposals.</span
                >
                What are these shareholder proposals that your funds vote on?
                Let’s take a look at this pillar of corporate democracy in the
                U.S.
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    




    <ChartSankey class="my-10" />



    <v-container class="mt-12">
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <v-row justify="center">
            <v-col cols="12" sm="10" md="7">
              <h4 class="title">
                Conclusions.
                <!-- <span class="font-weight-regular"
                  >Lorem ipsum dolor sit amet.</span
                > -->
              </h4>
            </v-col>
          </v-row>
          <v-row class="mt-4" justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="secondary"
                >mdi-numeric-1-circle</v-icon
              >
            </v-col>

            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold"
                  >Each year, shareholders try to call on companies to take
                  action of environmental and social issues by submitting
                  shareholder proposals.</span
                >
                A little less than half of those proposals are up for vote at
                the companies’ annual shareholder meetings.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="primary"
                >mdi-numeric-2-circle</v-icon
              >
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold"
                  >2. For the environmental and social proposals that make it to
                  the annual shareholder meeting, the majority is rejected and
                  fail to get enough votes.</span
                >
                However, even though less proposals appear on the ballot, the
                amount of support for those is rising. This intensifies the
                pressure for companies coming from shareholder proposals - even
                though they fail to pass. It matters more than ever.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="secondary"
                >mdi-numeric-3-circle</v-icon
              >
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                As mutual funds and ETFs are bundles of many different stocks,
                <span class="font-weight-bold">
                  they vote on many shareholder meetings - on behalf of us,
                  owners of those funds.
                  <br /><br />
                  The records of those votes are public but inaccessible.
                </span>
              </p>
            </v-col>
          </v-row>
          <!-- <v-row class="my-12" justify="center">
            <v-col cols="12" sm="10" md="7">
              <p class="display-1 font-weight-thin text-center">
                <span>
                  Bridge text: How do these conclusions relate to the voting
                  behavior of the “most passive shareholders"?
                </span>
              </p>
            </v-col>
          </v-row> -->
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-container class="mt-12 pa-6">
      <v-row class="mb-10">
        <v-col>
          <h3 class="display-1 font-weight-thin">
            The role and impact of funds
          </h3>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <v-row justify="center">
            <v-col cols="12" sm="10" md="7">
              <h4 class="title">
                What can a fund do? How much influence do they have?
              </h4>
            </v-col>
          </v-row>
          <v-row class="mt-4" justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="secondary"
                >mdi-account-multiple-plus</v-icon
              >
            </v-col>

            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold">
                  Everyone who has a pension fund owns some kind of mutual
                  funds..
                </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec. Tincidunt id aliquet risus feugiat in ante metus.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="primary"
                >mdi-arrow-decision</v-icon
              >
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold">Funds vote on your behalf!</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="primary"
                >mdi-chart-arc</v-icon
              >
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold"
                  >Funds have a large influence.</span
                >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec.
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container> -->
    <!-- <v-container>
      <v-row class="mt-n6">
        <v-col cols="12" class="d-flex justify-center">
          <ChartPie />
        </v-col>
      </v-row>
    </v-container> -->
    <v-container class="mt-12 pa-6">
      <v-row class="mb-10">
        <v-col>
          <h3 class="display-1 font-weight-thin">
            We tried to shed some light on this.
          </h3>
        </v-col>
      </v-row>
    </v-container>
    <!-- :categories="['e', 's', 'g']" -->
    <ChartBubbleViolin
      v-intersect.quiet="onIntersect"
      :data="bubbleData"
      :proposals="proposals"
      :categories="['e', 's', 'g']"
      :categoriesDetails="categoriesDetails"
      yProperty="support"
      yAxisLabel="Support as a percentage of the proposals the fund voted on"
      :customYDomain="[0, 100]"
      sizeProperty="vote"
      :sizeDomain="[0, 1000]"
      :sizeRange="[1, 15]"
    />
  </v-container>
</template>

<script>
// import bubbleData from "../static/data/bubble_chart.csv";
// import proposals from "../static/data/proposals.csv";
// import bubbleData from "../static/data/funds_only_e.csv";

import ChartSankey from "~/components/ChartSankey.vue";
import ChartPie from "~/components/ChartPie.vue";
// import ChartBubbleViolin from "~/components/ChartBubbleViolin.vue";

export default {
  // For components in the pages folder you can use the layout property
  // to select one of the layouts defined in the layouts folder
  layout: "default",
  components: { ChartSankey, ChartPie},
  data() {
    return {
      isHydrated: false,
      // bubbleData: bubbleData,
      // proposals: proposals,
      // categoriesDetails: [
      //   { code: "e", title: "Environmental", color: "#81C784" },
      //   { code: "s", title: "Social", color: "#E25F68" },
      //   { code: "g", title: "Governance", color: "#4A5B7E" }
      // ]
    };
  },
  mounted() {
    this.isHydrated = true;
    // console.log(this.proposals);
  },
  methods: {
    onIntersect(event) {
      // console.log(event);
      if (event[0].isIntersecting) {
        this.$store.commit("interfaceFundSearchBar/ChangeShowInterface", true);
      } else {
        this.$store.commit("interfaceFundSearchBar/ChangeShowInterface", false);
      }
    }
  }
};
</script>
