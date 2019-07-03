import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/core'

export default class TestComponent extends Component {
  state = {
    initialize: false,
    game: {
      width: "100%",
      height: "100%",
      type: Phaser.AUTO,
      scene: {}
    }
  }
  render() {
    const { initialize, game } = this.state
    return (
      <IonPhaser game={game} initialize={initialize} />
    )
  }
}