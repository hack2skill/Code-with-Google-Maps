import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Image,
  HStack,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Modal,
  ModalFooter
} from '@chakra-ui/react';
import "../report.css"

import { useEffect, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import MapContainer from './MapContainer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function Report() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [markerPosition, setMarkerPosition] = useState(null);
  const [desc,setDesc]=useState("");
  const navigate=useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      postDetail(file);
    } else {
      setSelectedFile(null);
    }
  };
  const postDetail = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      setPic()
    }
    else if (pic.type === "image/jpeg" || pic.type === "image/png" || pic.type === "image/webp") {
      const data = new FormData();
      data.append("file", pic)
      data.append("upload_preset", "RoadSafety")
      data.append('cloud_name', "dbpdayu3c");
      fetch(`https://api.cloudinary.com/v1_1/dbpdayu3c/image/upload`, {
        method: "POST", body: data
      }).then((res) =>
        res.json()
      ).then((data) => {
        setPic(data.url.toString())
        setLoading(false)
      }).catch(err => {
        console.log(err)
      })
    }
  }
  const uploadReport=async()=>{
    setLoading(true)
    try {
      const data={
        longitude:markerPosition.lng, latitude:markerPosition.lat, icon:pic, desc:desc
      }
      const report=await axios.post('http://localhost:8800/report',data,{
        withCredentials: true,
      });
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box h='100vh' w='100vw'>
      <Container maxW="container.xl" display="flex" px={3}>
        <Box w="40px" h="40px">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios-glyphs/90/hole.png"
            alt="hole"
          />
        </Box>
        <Box pl={1}>
          <Text fontSize="2xl" fontWeight="extrabold" fontFamily="mono">
            RoadSafety
          </Text>
        </Box>
      </Container>
      <Container maxW="container.xl" display="flex" >
        <Flex mt={9} w='100%' justifyContent='center' alignItems='center'>
          <Box overflowX="hidden" >
            <Text fontSize="4xl" fontWeight="bold" pb={5}>
              Report Issue!
            </Text>
            <Box pt={5} pb={2} as="form">
              <FormControl pt={0} pb={5}>
                <FormLabel htmlFor="name">Description of the issue.</FormLabel>
                <Input type="text" name="name" id="name" required autoComplete="off" value={desc} onChange={(e)=>{
                  setDesc(e.target.value)
                }} />
              </FormControl>
              {!loading ? <Box>
                <Input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  display="none"
                  onChange={handleFileChange}
                />
                <HStack>
                  <Button
                    as="label"
                    htmlFor="fileInput"
                    colorScheme="teal"
                    size="md"
                    mb={2}
                    cursor="pointer"
                  >
                    Upload Image
                  </Button>
                  <Button colorScheme="teal"
                    size="md" onClick={onOpen}>Select Location <FaLocationArrow /> </Button>
                  <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Select Location</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <MapContainer markerPosition={markerPosition} setMarkerPosition={setMarkerPosition}/>
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                          Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                  <Button
                    colorScheme="teal"
                    size="md"
                    onClick={uploadReport}
                  >
                    Upload
                  </Button>
                </HStack>
                {selectedFile && (
                  <Box>
                    <strong>Selected File:</strong> {selectedFile.name}
                    <Image src={URL.createObjectURL(selectedFile)} maxH="200px" maxW="200px" mt={2} />
                  </Box>
                )}
              </Box> : <Box>Loading</Box>}
            </Box>
            {/* <Box borderBottom="1px" borderColor="gray.400" mt={7} w="66.66%" /> */}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Report;