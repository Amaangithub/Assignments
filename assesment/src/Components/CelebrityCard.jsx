import PropTypes from "prop-types";
import { BsPencil, BsTrash3 } from "react-icons/bs";
import {
  Card,
  Accordion,
  Col,
  Image,
  Container,
  Row,
  Form,
} from "react-bootstrap";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";

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
  handleCancel,
}) => {
  return (
    <Card style={{ width: "500px" }}>
      <Accordion.Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          background: "transparent",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <Col>
            <Image
              src={celebrity.picture}
              roundedCircle
              style={{ width: "70px", height: "70px" }}
            />
          </Col>
        </div>

        <div
          onClick={(e) => handleInputClick(e)}
          style={{
            fontSize: "21px",
            marginLeft: "20px",
          }}
        >
          {editMode && editedCelebrity.id === celebrity.id ? (
            <input
              type="text"
              value={`${editedCelebrity.first} ${editedCelebrity.last}`}
              onChange={(e) => handleNameInputChange(e, "name")}
              className="form-control form-control-md"
              style={{ fontSize: "20px" }}
              required
            />
          ) : (
            ` ${celebrity.first} ${celebrity.last}`
          )}
        </div>
      </Accordion.Header>

      <Accordion.Body>
        <Container>
          <Row>
            <Col style={{ color: "grey", fontWeight: "bold" }}>Age</Col>
            <Col style={{ color: "grey", fontWeight: "bold" }}>Gender</Col>
            <Col style={{ color: "grey", fontWeight: "bold" }}>Country</Col>
          </Row>

          <Row>
            <Col>
              {editMode && editedCelebrity.id === celebrity.id ? (
                <Form>
                  <Form.Control
                    value={`${editedCelebrity.age} Years`}
                    onChange={(e) => handleInputChange(e, "age")}
                    required
                  />
                </Form>
              ) : (
                `${calculateAge(celebrity.dob)} Years`
              )}
            </Col>
            <Col>
              {editMode && editedCelebrity.id === celebrity.id ? (
                <Form.Select
                  value={editedCelebrity.gender}
                  onChange={(e) => handleInputChange(e, "gender")}
                  required
                  aria-label="Default select"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="transgender">Transgender</option>
                  <option value="rather not say">Rather not say</option>
                  <option value="other">Other</option>
                </Form.Select>
              ) : (
                celebrity.gender.charAt(0).toUpperCase() +
                celebrity.gender.slice(1)
              )}
            </Col>
            <Col>
              {editMode && editedCelebrity.id === celebrity.id ? (
                <Form>
                  <Form.Control
                    value={editedCelebrity.country}
                    onChange={(e) => handleInputChange(e, "country")}
                    required
                  />
                </Form>
              ) : (
                celebrity.country
              )}
            </Col>
          </Row>

          <Col>
            <Card.Subtitle>Description</Card.Subtitle>
            <Card.Text style={{ textAlign: "left" }}>
              {editMode && editedCelebrity.id === celebrity.id ? (
                <Form>
                  <Form.Control
                    as="textarea"
                    type="text"
                    className="form-control"
                    rows="5"
                    value={editedCelebrity.description}
                    onChange={(e) => handleInputChange(e, "description")}
                    required
                    style={{
                      height: "auto",
                      resize: "none",
                      overflow: "hidden",
                    }}
                  />
                </Form>
              ) : (
                <span style={{ textAlign: "justify", textJustify: "auto" }}>
                {celebrity.description}
                </span>
              )}
            </Card.Text>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              {editMode && editedCelebrity.id === celebrity.id ? (
                <div style={{ marginTop: "5px" }}>
                  <MdOutlineCancel
                    color="red"
                    fontSize={25}
                    onClick={handleCancel}
                  />
                  <RiCheckboxCircleLine
                    onClick={handleSave}
                    disabled={!isFormValid()}
                    style={{ marginLeft: "30px" }}
                    color="green"
                    fontSize={25}
                  />
                </div>
              ) : (
                <>
                  <BsTrash3
                    color="red"
                    fontSize={20}
                    onClick={() => {
                      setShowDeleteModal(true);
                      setDeleteId(celebrity.id);
                    }}
                  />
                  <BsPencil
                    color="blue"
                    fontSize={20}
                    style={{ marginLeft: "30px" }}
                    onClick={() => handleEdit(celebrity)}
                  />
                </>
              )}
            </div>
          </Col>
        </Container>
      </Accordion.Body>
    </Card>
  );
};

export default CelebrityCard;

CelebrityCard.propTypes = {
  celebrity: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  editedCelebrity: PropTypes.object,
  handleInputChange: PropTypes.func.isRequired,
  calculateAge: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  isFormValid: PropTypes.func,
  handleDelete: PropTypes.func.isRequired,
  handleNameInputChange: PropTypes.func.isRequired,
  handleAccordionClick: PropTypes.func,
  handleInputClick: PropTypes.func.isRequired,
  setDeleteId: PropTypes.func.isRequired,
  setShowDeleteModal: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
};
