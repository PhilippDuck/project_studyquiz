import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiChevronDown } from "react-icons/fi";
import {
  MdOutlineCreate,
  MdOutlineLeaderboard,
  MdWbSunny,
  MdNightlight,
  MdLogin,
  MdLogout,
} from "react-icons/md";
import { useRealm } from "../provider/RealmProvider";
import { LuUser } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

/**
 * Menüelemente
 */
const LinkItems = [
  { name: "Spielen", icon: FiHome, to: "games" },
  { name: "Erstellen", icon: MdOutlineCreate, to: "create" },
  { name: "Ranglisten", icon: MdOutlineLeaderboard, to: "highscores" },
  { name: "Profil", icon: LuUser, to: "profil" },
];

/**
 * Logo bzw. Seitentitel
 */
const logo = <Logo w={"150px"} />;

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="0.5s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      zIndex={"200"}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {logo}

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link onClick={onClose} key={link.name} to={link.to}>
          <NavItem icon={link.icon}>{link.name}</NavItem>
        </Link>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="3"
        mx="4"
        borderRadius="md"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "primary.500",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const app = useRealm();
  const navigate = useNavigate();
  const isEmailPasswordUser =
    app.currentUser?.providerType === "local-userpass";
  const nickname = app.currentUser?.customData?.nickname || "NONAME";

  return (
    <Flex
      ml={{ base: 0, md: 0 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      w={"100%"}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      position={"fixed"}
      left={0}
      zIndex={"100"}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Box display={{ base: "flex", md: "none" }}>{logo}</Box>

      <HStack spacing={{ base: "1", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={colorMode == "dark" ? <MdWbSunny /> : <MdNightlight />}
          onClick={toggleColorMode}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.1s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src="" name={nickname} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize={"sm"}>{nickname}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {isEmailPasswordUser ? "angemeldet" : "anonym"}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList borderColor={useColorModeValue("gray.200", "gray.700")}>
              <Link to={"/profil"}>
                <MenuItem>
                  <Flex gap={2} align={"center"}>
                    <LuUser />
                    <Text>Profil</Text>
                  </Flex>
                </MenuItem>
              </Link>
              <MenuDivider />

              {isEmailPasswordUser ? (
                <MenuItem
                  onClick={async () => {
                    await app.currentUser.logOut();
                    navigate("/");
                  }}
                  color={useColorModeValue("red.700", "red.300")}
                >
                  <Flex gap={2} align={"center"}>
                    <MdLogout />
                    <Text>Abmelden</Text>
                  </Flex>
                </MenuItem>
              ) : (
                <Link to={"/login"}>
                  <MenuItem>
                    <Flex gap={2} align={"center"}>
                      <MdLogin />
                      <Text>Login</Text>
                    </Flex>
                  </MenuItem>
                </Link>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ content }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4" pt={24}>
        {content}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
