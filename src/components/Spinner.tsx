const Spinner = () => {
  return (
    <div className="spinner" role="status">
      <span className="sr-only">Loading...</span>
      <style jsx>
        {`
          .spinner {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            vertical-align: -0.125em;
            border: 0.25em solid currentColor;
            border-right: 0.25em solid transparent;
            border-radius: 50%;
            animation: spin-around 0.75s linear infinite;
          }
          @keyframes spin-around {
            to {
              transform: rotate(1turn);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;
