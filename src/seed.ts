
import Doctor from "./models/Doctor";


// organization : 64ec5ddc9940c884ca3f166a
// cv : 64ed60bec0614880d82d713d

export const seedDoctor = async(req,res) => {
    Doctor.create({
        fullName: "Dr. Mugabo Arstide",
        email: "mugaboarstide@gmail.com",
        phoneNumber: "078342382",
        organization: "64ec5ddc9940c884ca3f166a",
        bio: "hello, I am a doctor specialized in cardiology",
        cv: "64ed60bec0614880d82d713d",
        specialization: "cardiology",
        gender: "male",
        password: "doctor123"
    }).then((doctor) => {
        console.log(doctor);
    } 
    ).catch((err) => {
        console.log(err);
    }
    );
}


