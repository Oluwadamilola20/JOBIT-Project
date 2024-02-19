import yup from "yup"

async function validateJob(data) {
    const schema = yup.object().shape({
      jobTitle: yup.string().required("Job Title"),
      companyEmail: yup.string().email().required().label("Company Email"),
      companyName: yup.string().min(2).max(50).required().label("Company Name"),
      jobType: yup.string().min(2).max(50).required().label(" Job Type"),
      jobDescription: yup.string().min(2).max(50).required().label(" Job Description"),
      jobRequirements: yup.string().min(2).max(50).required().label("Job Requirements "),
      
    });
  
    try {
      await schema.validate(data);
  
      return null;
    } catch (error) {
      console.error(error.errors[0]);
      return error.errors[0];
    }
}

export default validateJob