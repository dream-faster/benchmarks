import { Meta } from '@/layouts/Meta';
import { Article } from '@/templates/Article';
import { Main } from '@/templates/Main';

const About = () => (
  <Main
    wide={true}
    meta={
      <Meta
        title="About us - Nowcasting Eval | ML Research"
        description="About us"
        social_card_ending="aboutus"
      />
    }
  >
    <Article>
      <article className="prose-zinc prose w-full dark:prose-invert ">
        <h2> Studio </h2>
        <p>
          We are Nowcasting Eval, a Machine Learning Research Studio specialized
          in Nowcasting (high frequency, short term forecasting) of Complex
          Dynamical Systems (Finance, Energy). Based in Berlin, we currently
          collaborate with Machine Learning Practicioners and Researchers across
          Europe and the Americas.
          <br />
          <br />
          Some of the models we are interested in:
          <br />
          - Forecasting Non-stationary Time Series
          <br />
          - Bringing uncertainty measurements into our forecasting process
          <br />
          - Neuro-symbolic approaches, eg. symbolic regression.
          <br />
          <br />
          <h2 id="community"> Community </h2>
          Since 2021 we have been developing a community of likeminded
          individuals, who we meet weekly for: Project Demonstrations and Deep
          Dives Mini-lectures on computational models, eg.: Caustics Paper
          Reviews on new, exciting papers. If you would like to apply to the
          community then DM us on @hellosemy or @itchingpixels to join the
          family.
          <br />
          <br />
          Become part of the journey in experimenting with a new way of
          organising technological spin-offs. We write deep insights into what
          went well and wrong in our datasets, and show the state of affairs in
          those segments.
          <br />
        </p>
        Subscribe here:
      </article>
    </Article>
  </Main>
);

export default About;
