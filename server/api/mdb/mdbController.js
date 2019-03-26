


module.exports = function(dbs){
  let subjectData = "subjectData"
  function getAllSubjects(req, res) {

    let subjectname = req.params.subject;
    dbs.production.collection(subjectData).distinct("subject").then((docs) => {

      res.json(docs);
    }).catch(error => {
      console.log("errvewMDB", error);
    })
  }

  function getIndividualSubjectData(req, res) {

    let subjectname = req.params.subject;
    dbs.production.collection(subjectData).find({ subject: subjectname }).toArray().then((docs) => {

      res.json(docs);

    }).catch(error => {
      console.log("errvewMDB", error);
    })
  }
  return { getAllSubjects, getIndividualSubjectData }
}

