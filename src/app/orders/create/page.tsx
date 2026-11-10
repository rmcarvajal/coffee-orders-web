import { redirect } from "next/navigation";

export default function OrderForm() {

    async function make(formData: FormData){
        "use server";

        const item = formData.get("item");
        const quantity = formData.get("quantity")
        const customerId = formData.get("customerId")

   const response = await fetch(`${process.env.COFFEE_API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item, quantity, customerId }),
  }).catch(() => null);

    if (!response?.ok) {redirect("/orders/create?error=1")}
    else {redirect("/orders");}

    


    }

    return (
        <>
            <form action={make}>
                <h1>Order form</h1>
                <h2>Item</h2>
                <input type="text" placeholder="Item name" name="item" />

                <h2>Quantity</h2>
                <input type="text" placeholder="Quantity name" name="quantity" />

                <h2>Customer ID</h2>
                <input type="text" placeholder="Customer id" name="customerId"/>

                <button type="submit">Send</button>
            </form>
        </>
    )
}