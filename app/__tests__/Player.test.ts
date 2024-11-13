import { Player } from '../types/Player';

describe('Player Class', () => {
    it('should create a Player with auto-generated ID and default name', () => {
        const player = new Player();
        expect(player.id).toBe(1);
        expect(player.name).toBe('Player 1');
    });

    it('should allow creating a Player with a specified ID and name,', () => {
        const player = new Player(4, 'Lin Dan');
        expect(player.id).toBe(4);
        expect(player.name).toBe('Lin Dan');
    });

    it('should allow auto-generating ID when name specified', () => {
        const player = new Player(undefined, 'Lee Chong Wei');
        expect(player.id).toBe(2);
        expect(player.name).toBe('Lee Chong Wei');
    });

    it('should allow auto-generating name when id specified', () => {
        const player = new Player(3, undefined);
        expect(player.id).toBe(3);
        expect(player.name).toBe('Player 3');
    });
});
