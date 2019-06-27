import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.6,
// }

class BurgerBuilder extends Component {
    state = {
        ingredients: {salad: 0, bacon: 0, cheese: 0, meat: 0},
        ingredientsPrice: {salad: 0.5, cheese: 0.4, meat: 1.3, bacon: 0.6},
        totalPrice: 4,
        purchaseable: true,
        purchasing: false,
    }

    updatePurchaseState (ingredients) {
        const sum = Object.values(ingredients)
        .reduce((prevItem, currentItem) => {
            return prevItem + currentItem;
        },0);
        this.setState({purchaseable: sum < 0});
    }


    moreHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount + 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type] = updatedCount;

        // const priceAddition = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition;

        // this.setState({totalPrice: newPrice, ingredients: updatedIngredients});


        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount

        const priceAddition = this.state.ingredientsPrice[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients, totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    lessHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount - 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type] = updatedCount;

        // const priceAddition = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition;

        // this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceDeducition = this.state.ingredientsPrice[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeducition;
        
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // {salad: true, meat: false, ...}

        return(
            <Aux>
                <Modal show={this.state.purchasing} hide={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        hide={this.purchaseCancelHandler}
                        continue={this.purchaseContinueHandler}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    lessBtn={this.lessHandler}
                    moreBtn={this.moreHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    purchasing={this.purchaseHandler} />
            </Aux>
        );
    }

}

export default BurgerBuilder;