import { Card, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BsPencil, BsTrash3 } from "react-icons/bs";
import { Accordion, Col, Image } from "react-bootstrap";
import { RiCheckboxCircleLine } from "react-icons/ri";

const CelebrityCard = ({
  celebrity,
  editMode,
  editedCelebrity,
  handleInputChange,
  calculateAge,
  handleEdit,
  handleSave,
  isFormValid,
  setShowDeleteModal,
  setDeleteId,
  handleInputClick,
  handleNameInputChange,
}) => {
  return (
    <Card style={{ width: "400px" }}>
      <Accordion.Header>
        <div>
          <Col>
            <Image
              src={celebrity.picture}
              roundedCircle
              style={{ width: "50px", height: "50px" }}
            />
          </Col>
        </div>

        <td onClick={(e) => handleInputClick(e)}>
          {editMode && editedCelebrity.id === celebrity.id ? (
            <input
              type="text"
              value={`${editedCelebrity.first} ${editedCelebrity.last}`}
              onChange={(e) => handleNameInputChange(e, "name")}
              className="form-control form-control-md"
              required
            />
          ) : (
            `${celebrity.first} ${celebrity.last}`
          )}
        </td>
      </Accordion.Header>

      <Accordion.Body>
        <Table>
          <th style={{ color: "grey", border: "none" }}>Age</th>
          <th style={{ color: "grey", border: "none" }}>Gender</th>
          <th style={{ color: "grey", border: "none" }}>Country</th>

          <tbody>
            <td style={{ border: "none", text: "center" }}>
              {editMode && editedCelebrity.id === celebrity.id ? (
                <input
                  type="text"
                  value={editedCelebrity.age}
                  onChange={(e) => handleInputChange(e, "age")}
                  className="form-control form-control-md"
                  required
                />
              ) : (
                calculateAge(celebrity.dob)
              )}
            </td>
            <td style={{ border: "none" }}>
              {editMode && editedCelebrity.id === celebrity.id ? (
                <select
                  value={editedCelebrity.gender}
                  onChange={(e) => handleInputChange(e, "gender")}
                  className="form-control form-control-md custom-select"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="transgender">Transgender</option>
                  <option value="rather not say">Rather not say</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                celebrity.gender.charAt(0).toUpperCase() +
                celebrity.gender.slice(1)
              )}
            </td>
            <td style={{ border: "none" }}>
              {editMode && editedCelebrity.id === celebrity.id ? (
                <input
                  type="text"
                  className="form-control form-control-md"
                  value={editedCelebrity.country}
                  onChange={(e) => handleInputChange(e, "country")}
                  required
                />
              ) : (
                celebrity.country
              )}
            </td>
          </tbody>
        </Table>
        <Card.Text style={{ textAlign: "left" }}>
          {editMode && editedCelebrity.id === celebrity.id ? (
            <textarea
              type="text"
              className="form-control"
              rows="8"
              value={editedCelebrity.description}
              onChange={(e) => handleInputChange(e, "description")}
              required
              style={{
                height: "auto",
                resize: "none",
                overflow: "hidden",
              }}
            />
          ) : (
            <div>{celebrity.description}</div>
          )}
        </Card.Text>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {editMode && editedCelebrity.id === celebrity.id ? (
            <>
              <MdOutlineDeleteForever
                color="red"
                fontSize={25}
                onClick={() => {
                  setShowDeleteModal(true);
                  setDeleteId(celebrity.id);
                }}
              />
              <RiCheckboxCircleLine
                onClick={handleSave}
                disabled={!isFormValid()}
                style={{ marginLeft: "30px" }}
                color="green"
                fontSize={25}
              />
            </>
          ) : (
            <>
              <BsTrash3
                color="red"
                onClick={() => {
                  setShowDeleteModal(true);
                  setDeleteId(celebrity.id);
                }}
              />
              <BsPencil
                color="blue"
                style={{ marginLeft: "30px" }}
                onClick={() => handleEdit(celebrity)}
              />
            </>
          )}
        </div>
      </Accordion.Body>
    </Card>
  );
};

export default CelebrityCard;

CelebrityCard.propTypes = {
  celebrity: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  editedCelebrity: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  calculateAge: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleNameInputChange: PropTypes.func.isRequired,
  handleAccordionClick: PropTypes.func.isRequired,
  handleInputClick: PropTypes.func.isRequired,
  setDeleteId: PropTypes.func.isRequired,
  setShowDeleteModal: PropTypes.func.isRequired,
};
