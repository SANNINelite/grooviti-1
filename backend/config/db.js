import moongse from "mongoose";

export const connectDB = async () => {
  await moongse.connect('mongodb+srv://adityadivate25:0101196625@cluster0.eyk0n.mongodb.net/GROOVITI').then(() => console.log("DB Connected"));
}