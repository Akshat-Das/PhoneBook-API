// Add a contact
// Remove the contact
// Update the contact
// Search Contact

//  -> By name (partial name can also be searched)
// ->  By phone number
// ->  By email
// ->  Search results should be sorted alphabetically (by name).
// Contact:-
// -> Will have a Name (required) -
// -> Will/Can have multiple phone numbers (should have at least 1 phone number)
// -> Will/Can have multiple emails
// -> Will/Can have a single Date of birth (not mandatory)

// Constraints :
// -> Two contacts cannot have the same phone numbers
// -> Two contacts can have the same emails.
// Note:-
// -> Use the database of your choice
// -> You can design the UI of your choice

const express = require("express");
const Contact = require("../models/contact.js");
const router = new express.Router();

router.post("/contacts", async (req, res) => {
  if (!req.body.phoneNumbers || req.body.phoneNumbers.length === 0) {
    return res
      .status(400)
      .send({ message: "At least one phone number has to be provided" });
  }
  const contact = new Contact(req.body);
  try {
    await contact.save();
    res.status(201).send(contact);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Contact deleted successfully" });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(contact);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/contacts", async (req, res) => {
  try {
    const { name, phoneNumbers, emailId } = req.query;
    const query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (phoneNumbers) {
      query.phoneNumbers = { $in: [phoneNumbers] };
    }
    if (emailId) {
      query.emailId = emailId;
    }
    const contacts = await Contact.find(query).sort({ name: 1 });
    res.status(200).send(contacts);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
