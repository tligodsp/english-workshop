import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Difficulty } from "../models/difficulty";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  constructor(public db: AngularFirestore) {}

  getDifficulties(): Difficulty[] {
    let res: Difficulty[] = [];
    this.db.collection('difficulties').get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          //console.log(doc.data().id);
          res.push({id: doc.data().id, name: doc.data().name, minutes: doc.data().minutes})
      });
    });
    console.log(res);
    return res;
  }

  getDifficulty(id: string): Difficulty {
    var docRef = this.db.collection('difficulties').doc(id);

    docRef.get().toPromise().then(doc => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            return {id: doc.data().id, name: doc.data().name, minutes: doc.data().minutes};
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(error => {
        console.log("Error getting document:", error);
    });
    return null;
  }
}
