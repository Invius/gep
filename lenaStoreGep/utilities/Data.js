export default {
    productsInSales: [
        {
            photo: "",
            name: "Ramo 1",
            description: "Ramo Lindo",
            ID: "ramo_1",
            price: 10
        },
        {
            photo: "",
            name: "Ramo 2",
            description: "Ramo Feio",
            ID: "ramo_2",
            price: 25
        },
        {
            photo: "",
            name: "Ramo do dia dos namorados",
            description: "Ramo perfeito para a namorada",
            ID: "ramo_do_dia_dos_namorados",
            price: 5
        },
        {
            photo: "",
            name: "Ramo como nome ainda mais longo para teste natural",
            description: "Descrição longa que supere os tamanhos esperados por isso ter de ser um experimento real",
            ID: "ramo_come_nome_ainda_mais_longo_para_teste_natural",
            price: 999999999
        },
        {
            photo: "",
            name: "Ramo mais barato",
            description: "Ramo simples sem grande descrição",
            ID: "ramo_mais_barato",
            price: 1
        },
    ],
    productsOutOfSale: [
        {
            photo: "",
            name: "Ramo 333",
            description: "Ramo Lindo 2",
            ID: "ramo_333",
            price: 8
        },
        {
            photo: "",
            name: "Ramo 5",
            description: "Ramo Feio 789456",
            ID: "ramo_5",
            price: 12
        },
        {
            photo: "",
            name: "Ramo do dia dos pais",
            description: "Ramo imperfeito para o pai",
            ID: "ramo_do_dia_dos_pais",
            price: 72
        },
        {
            photo: "",
            name: "Ramo como nome ainda mais longo para teste natural mais longo ainda",
            ID: "ramo_como_nome_ainda_mais_longo_para_teste_natural_mais_longo_ainda",
            description: "Descrição pequena",
            price: 2
        },
        {
            photo: "",
            name: "Ramo mais caro",
            description: "Ramo complexo",
            ID: "ramo_mais_caro",
            price: 9999999999
        },
    ],
    currentPurchases: [
        {
            clientInfo: "Maria \n 912222222",
            address: "Rua do pinho Aveiro numero 104",
            totalQuantity: 2,
            ID: "M23",
            totalSpent: 30,
            date: 1647058227531,
            state: "notPaid",
        },
        {
            clientInfo: "Teresa \n 91333333",
            address: "Rua troviscal Aveiro numero 52",
            totalQuantity: 2,
            ID: "M24",
            totalSpent: 30,
            date: 1647058227531,
            state: "notPaid",
        },
        {
            clientInfo: "Rui \n 914444444",
            address: "Rua almeirim predio b Aveiro numero 12",
            totalQuantity: 2,
            ID: "M25",
            totalSpent: 30,
            date: 1647058227531,
            state: "notPaid",
        },
        {
            clientInfo: "Marcio \n 911111111",
            address: "Rua da boa fonte Coimbra numero 6",
            totalQuantity: 2,
            ID: "M26",
            totalSpent: 30,
            date: 1647058227531,
            state: "notPaid",
        },
        {
            clientInfo: "Luis \n 919999999",
            address: "Avenida dos aliados Porto numero 110",
            totalQuantity: 2,
            ID: "M27",
            totalSpent: 30,
            date: 1647058227531,
            state: "notPaid",
        },
        {
            clientInfo: "Paula \n 918989898",
            address: "Rua do pendurado Aveiro numero 96",
            totalQuantity: 2,
            ID: "M28",
            totalSpent: 30,
            date: 1647058227531,
            state: "notPaid",
        },
    ],
    finalizedPurchases: [
        {
            clientInfo: "Teresa \n 91333333",
            address: "Rua troviscal Aveiro numero 52",
            totalQuantity: 2,
            ID: "M24",
            totalSpent: 30,
            date: 1647058227531,
            state: "notPaid",
        },
        {
            clientInfo: "Rui \n 914444444",
            address: "Rua almeirim predio b Aveiro numero 12",
            totalQuantity: 2,
            ID: "M25",
            totalSpent: 30,
            date: 1647058227531,
            state: "notPaid",
        },
        {
            clientInfo: "Marcio \n 911111111",
            address: "Rua da boa fonte Coimbra numero 6",
            totalQuantity: 2,
            ID: "M26",
            totalSpent: 30,
            date: 1647058227531,
            state: "notPaid",
        },
        {
            clientInfo: "Luis \n 919999999",
            address: "Avenida dos aliados Porto numero 110",
            totalQuantity: 2,
            ID: "M27",
            totalSpent: 30,
            date: 1647058227531,
            state: "notPaid",
        },
        {
            clientInfo: "Paula \n 918989898",
            address: "Rua do pendurado Aveiro numero 96",
            totalQuantity: 2,
            ID: "M28",
            totalSpent: 30,
            date: 1647058227531,
            state: "notPaid",
        },
    ],
    oldPurchases: [
        {
            clientInfo: "Maria \n 912222222",
            address: "Rua do pinho Aveiro numero 104",
            totalQuantity: 2,
            ID: "M23",
            totalSpent: 30,
            date: 1647058227531,
            state: "notPaid",
        },
    ],
    productTypes: [
        {
            name: "Ramos Lindos",
            key: "ramos_lindos"
        },
        {
            name: "Ramos Outono",
            key: "ramos_outono"
        },
        {
            name: "Ramos Primavera Verão",
            key: "ramos_pr_ve"
        },
        {
            name: "Vasos",
            key: "vasos"
        },
    ],
    messagesFromPurchase: [
        {
            type: "C",
            message: "Ola, pode me informar qual é o producto mais barato?" 
        },
        {
            type: "V",
            message: "Ramos simples no geral são os mais baratos." 
        },
        {
            type: "C",
            message: "Só comprei roselias, se comprasse mal-me-queres, podia fazer desconto?" 
        },
        {
            type: "V",
            message: "Sim posso fazer-lhe a 30 em vez de 40." 
        },

    ], 
    productsFromPurchase: [
        {
            name: "Ramo mais caro",
            ID: "ramo_mais_caro",
        },
        {
            name: "Ramo do dia dos pais",
            ID: "ramo_do_dia_dos_pais"
        },
        {
            name: "Ramo 5",
            ID: "ramo_5",
        },
    ]
    
}


