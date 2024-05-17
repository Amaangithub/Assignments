import { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, Form } from "react-bootstrap";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import CelebrityCard from "./CelebrityCard";
import { CiSearch } from "react-icons/ci";

const GetCelebs = () => {
  const [jsonData, setJsonData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedCelebrity, setEditedCelebrity] = useState(null);

  const handleAccordionClick = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const handleEdit = (celebrity) => {
    if (calculateAge(celebrity.dob) >= 18) {
      setEditMode(true);
      setEditedCelebrity({ ...celebrity, age: calculateAge(celebrity.dob) });
    } else {
      alert("Cannot edit details of a minor.");
    }
  };

  const handleSave = () => {
    const updatedData = jsonData.map((celebrity) => {
      if (celebrity.id === editedCelebrity.id) {
        const updatedCelebrity = { ...editedCelebrity };
        const currentDate = new Date();
        const birthYear = currentDate.getFullYear() - updatedCelebrity.age;
        updatedCelebrity.dob = new Date(
          birthYear,
          currentDate.getMonth(),
          currentDate.getDate()
        ).toISOString();
        return updatedCelebrity;
      }
      return celebrity;
    });
    setJsonData(updatedData);
    setEditMode(false);
    setEditedCelebrity(null);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedCelebrity(null);
  };
  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteData(deleteId);
      setShowDeleteModal(false);
    }
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/celebrities.json");
      if (!response.data) {
        throw new Error("Failed to fetch data");
      }
      setJsonData(response.data.celebrities);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredData = jsonData.filter((celebrity) =>
    `${celebrity.first} ${celebrity.last}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const deleteData = (id) => {
    try {
      setJsonData(jsonData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const isFormValid = () => {
    const { first, last, gender, age, country, description } = editedCelebrity;
    return first && last && age && gender && country && description;
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleInputChange = (event, field) => {
    const { value } = event.target;

    if (field === "age") {
      if (/^\d+$/.test(value) || value === "") {
        setEditedCelebrity({ ...editedCelebrity, [field]: value });
      }
    }

    if (/^\d+$/.test(value)) {
      setEditedCelebrity({ ...editedCelebrity, [field]: value });
    } else if (field === "country") {
      if (!/\d/.test(value)) {
        setEditedCelebrity({ ...editedCelebrity, [field]: value });
      }
    } else {
      setEditedCelebrity({ ...editedCelebrity, [field]: value });
    }
  };

  const calculateAge = (dobString) => {
    const dob = new Date(dobString);
    const currentDate = new Date();
    const ageDate = new Date(currentDate - dob);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  };
  const handleInputClick = (event) => {
    event.stopPropagation();
  };

  const handleNameInputChange = (e) => {
    const { value } = e.target;

    const [firstName, ...lastNameArray] = value.split(" ");
    const lastName = lastNameArray.join(" ");

    setEditedCelebrity((prev) => ({
      ...prev,
      first: firstName,
      last: lastName,
    }));
  };

  return (
    <div>
    <div className="search-container">
  <Form>
    <div className="input-with-icon" >
      <CiSearch className="search-icon" fontSize={25} />
      <Form.Control
        size="md"
        type="text"
        placeholder="Search User ...."
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: "20px", paddingLeft: "50px" }}
      />
    </div>
  </Form>
</div>


      <div>
        {filteredData.map((celebrity) => (
          <div key={celebrity.id} style={{ marginBottom: "20px" }}>
            <Accordion>
              <Accordion.Item
                eventKey={celebrity.id}
                onClick={() => handleAccordionClick(celebrity.id)}
              >
                <CelebrityCard
                  celebrity={celebrity}
                  editMode={editMode}
                  editedCelebrity={editedCelebrity}
                  handleInputChange={handleInputChange}
                  calculateAge={calculateAge}
                  handleEdit={handleEdit}
                  handleSave={handleSave}
                  isFormValid={isFormValid}
                  handleDelete={handleDeleteConfirm}
                  handleNameInputChange={handleNameInputChange}
                  handleClick={handleAccordionClick}
                  handleInputClick={handleInputClick}
                  setDeleteId={setDeleteId}
                  setShowDeleteModal={setShowDeleteModal}
                  handleCancel={handleCancel}
                />
              </Accordion.Item>
            </Accordion>
          </div>
        ))}

        <DeleteConfirmationModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default GetCelebs;
