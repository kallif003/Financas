import React, { useState, useEffect } from "react"
import { Menu, Modal, Input } from "antd"
import { Button, SecondaryButton } from "../../../atomos/buttons"
import firebase from "../../../../connection/firebaseConnection"
import { useRouter } from "next/router"
import { notification } from "antd"
import { CloseCircleOutlined } from "@ant-design/icons"
import { SmileOutlined } from "@ant-design/icons"
import { mdiLeadPencil } from "@mdi/js"
import Icon from "@mdi/react"
import useAuth from "../../../../hooks/useAuth"

const { SubMenu } = Menu

interface listSalary {
	key: string
	salary: number
}

const MenuInformations = () => {
	const [registrationModal, setRegistrationModal] = useState(false)
	const [editeModal, setEditeModal] = useState(false)
	const [stringValue, setStringValue] = useState("")
	const [salary, setSalary] = useState(0)
	const [mySalary, setMySalary] = useState<listSalary[]>([])
	const [visible, setVisible] = useState(false)
	const [user, setUser] = useState("")
	const router = useRouter()

	const AuthStateChanged = async () => {
		await firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				getSalary(user.uid)
				setUser(user.uid)
			} else {
				router.push("./LoginPage")
			}
		})
	}

	const showRegistrationModal = () => {
		setRegistrationModal(true)
	}

	const addSalary = (id = "") => {
		try {
			if (stringValue === "") return

			if (id !== "") {
				firebase
					.database()
					.ref("Salary")
					.child(user)
					.child(id)
					.update({
						salary: parseFloat(stringValue.replace(",", ".")).toFixed(2),
					})
					.then(() => {
						setEditeModal(false)
						notification.open({
							message: "Sucesso",
							description: "Salário editada!",
							icon: <SmileOutlined style={{ color: "#00C897" }} />,
						})
					})
					.catch((error) => {
						console.log(error)
					})
			} else {
				let mySalary = firebase.database().ref("Salary").child(user)
				let key: any = mySalary.push().key

				mySalary
					.child(key)
					.set({
						salary: parseFloat(stringValue.replace(",", ".")).toFixed(2),
					})
					.then(() => {
						setRegistrationModal(false)
						notification.open({
							message: "Sucesso",
							description: "Salário cadastrada!",
							icon: <SmileOutlined style={{ color: "#00C897" }} />,
						})
					})
					.catch((error) => {
						console.log(error)
					})
			}
		} catch (error) {
			notification.open({
				message: "Você foi deslogado",
				description: "Por favor refaça o login",
				icon: <CloseCircleOutlined style={{ color: "red" }} />,
			})
			router.push("./LoginPage")
		}
	}

	const setDisabledButton = () => {
		console.log(mySalary)
		if (mySalary.length > 0) setVisible(true)
	}

	const getSalary = async (uid: string) => {
		await firebase
			.database()
			.ref("Salary")
			.child(uid)
			.on("value", (snapshot) => {
				setMySalary([])

				snapshot.forEach((childItem) => {
					const data = {
						key: childItem.key,
						salary: childItem.val().salary,
					}
					setMySalary((old: any[]) => [...old, data])
				})
			})
	}

	useEffect(() => {
		AuthStateChanged()
	}, [user])

	return (
		<div>
			<Menu
				mode="inline"
				style={{
					background: "#00C897",
				}}
				theme="dark">
				<SubMenu
					key={1}
					title="Salário"
					onTitleClick={setDisabledButton}
					style={{
						fontWeight: "bold",
						marginBottom: "2rem",
						color: "#fff",
					}}>
					{mySalary.map((s) => (
						<Menu.Item
							style={{
								background: "#00C897",
								margin: "0px",
							}}>
							<div className="flex flex-row justify-between">
								<p>{`R$${String(s.salary).replace(".", ",")}`}</p>
								<SecondaryButton
									margin={-1}
									onClick={() => {
										setEditeModal(true)
										setStringValue(String(s.salary).replace(".", ","))
									}}>
									<Icon path={mdiLeadPencil} size={1} />
								</SecondaryButton>
							</div>
							<Modal
								title="Editar Salário"
								open={editeModal}
								onCancel={() => setEditeModal(false)}
								onOk={() => addSalary(s.key)}>
								<div className="flex flex-row justify-evenly">
									<h1>Salário</h1>
									<Input
										addonBefore="$"
										allowClear={true}
										value={stringValue}
										onChange={(event) => {
											setStringValue(event.target.value)
										}}
										style={{ width: "10rem" }}
									/>
								</div>
							</Modal>
						</Menu.Item>
					))}
					<div className={mySalary.length === 0 ? "block" : "hidden"}>
						<Menu.Item
							style={{
								background: "#00C897",
								margin: "0px",
							}}>
							<Button
								disabled={visible}
								width={5}
								height={1.5}
								onClick={() => setRegistrationModal(true)}
								className="hover:text-[#FFD365]">
								Cadastrar
							</Button>
						</Menu.Item>
					</div>
					<Modal
						title="Cadastrar Salário"
						open={registrationModal}
						onOk={() => addSalary()}
						onCancel={() => setRegistrationModal(false)}>
						<div className="flex flex-row justify-evenly">
							<h1>Salário</h1>
							<Input
								addonBefore="$"
								allowClear={true}
								value={stringValue}
								onChange={(event) => {
									setStringValue(event.target.value)
								}}
								style={{ width: "10rem" }}
							/>
						</div>
					</Modal>
				</SubMenu>
			</Menu>
		</div>
	)
}

export default MenuInformations
