import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue
} from '@chakra-ui/react'
import { useEffect, useState } from "react"
import ModalComp from "./components/ModalComp"


const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure() // useDisclosure controla o estado do modal
  const [data, setData] = useState([])
  const [dataEdit, setDataEdit] = useState({})

  const isMobile = useBreakpointValue({ // hook do chakra.ui para verificação se é mobile ou não
    base: true,
    lg: false,
  })

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente") // cad_cliente é o nome do banco - função para carregar dados na tela quanfdo entrar no site
    ? JSON.parse(localStorage.getItem("cad_cliente")) // se tiver algum dado, converte em JSON se n retorna um array vazio
    :[]

    setData(db_costumer) // coloca os dados através do setData
  },[setData])

  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email)

    setData(newArray)

    localStorage.setItem("cad_cliente",JSON.stringify(newArray))
  }

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="popins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}> {/* py - padding y em cima e em baixo /// px - padding x dos lados */}
        <Button colorScheme="purple" onClick={() => [setDataEdit({}), onOpen()]}>
          ADICIONAR NOVO CADASTRO
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                    Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                    E-mail
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({name, email}, index) => (
                <Tr key={index} cursor="pointer" _hover={{bg: "gray.100"}}>
                    <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                    <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                    <Td p={0}>
                      <EditIcon 
                        fontSize={20}
                        onClick={() => [
                          setDataEdit({name, email, index}),
                          onOpen(),
                        ]}
                      />
                    </Td>
                    <Td p={0}>
                      <DeleteIcon
                        fontSize={20}
                        onClick={() => handleRemove(email)}
                      />
                    </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      {isOpen && (
        <ModalComp 
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}

    </Flex>
  )
}

export default App
