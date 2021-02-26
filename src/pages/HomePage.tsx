import axios from "axios";
import { useEffect, useState } from "react";
import { idText } from "typescript";

export interface Item {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

export interface HomePageProps {
  email: string;
}

const HomePage: React.FC<HomePageProps> = ({ email }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    axios({
      method: "POST",
      url: "https://eygxmyj4p5.execute-api.us-east-1.amazonaws.com/items",
      data: {
        type: "all",
      },
    }).then((res) => {
      console.log(res.data);
      const newData = res.data as Item[];
      setItems(newData);
    });
  }, []);

  const orderItems = async () => {
    axios.get("https://eygxmyj4p5.execute-api.us-east-1.amazonaws.com/order", {
      params: {
        email,
      },
    }).then((el) => {
      console.log()
      alert("Succesfully Ordered.")
    });
  };

  return (
    <section id="home" className="mt-5">
      <h1 className="text-center my-3">Shopping Site</h1>

      <div className="card">
        <h5 className="card-header">Currently Selling Items</h5>
        <div className="card-body">
          {items.length === 0 && (
            <h3 className="text-center my-5 py-5">Loading</h3>
          )}
          <div className="row">
            {items &&
              items.map((item) => {
                return (
                  <div key={item.id} className="col-sm-12 col-md-4">
                    <div className="card">
                      <img
                        src={item.image_url}
                        alt=""
                        height={400}
                        width={400}
                        className="card-img top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p>{item.description}</p>
                        <button className="btn btn-raised btn-primary float-right" onClick={orderItems}>
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
