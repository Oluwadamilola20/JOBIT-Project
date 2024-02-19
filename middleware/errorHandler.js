const errorHandler = (err, req, res, next) => {
    console.error("Error middleware: ", err);
      
    res.status(500).json({ msg: "Something failed" });
};

export default errorHandler