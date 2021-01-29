class DevilGame
{
    playerServerId?: number;

    login(playerServerId: number)
    {
        this.playerServerId = playerServerId;
    }
}

export const game = new DevilGame();
