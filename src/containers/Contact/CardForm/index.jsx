const CardForm = () => {
  return (
    <div className="card-body">
      <form action="post">
        <div className="mb-3 mt-10p">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            aria-label="Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            aria-label="Email"
          />
        </div>
        <div className="mb-3">
          <textarea
            name="Message"
            className="form-control"
            id="Message"
            placeholder="Message"
            cols="30"
            rows="10"
          ></textarea>
        </div>

        <div className="text-center">
          <a
            className="btn bg-gradient-dark w-100 my-4 mb-2"
            href="mailto:support@mnb-nft.com"
            target="_blank"
            rel="noreferrer"
          >
            Send Message
          </a>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
