export const Card = (props) => (
  <div className="card w-96 bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">Card title!</h2>
      <p>{props.children}</p>
      {/* <div className="card-actions justify-end">
        <button className="btn-primary btn">Buy Now</button>
      </div> */}
    </div>
  </div>
);
