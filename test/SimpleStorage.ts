import { expect } from "chai";
import { network } from "hardhat";
const { ethers } = await network.create();

describe("SimpleStorge",function(){
     async function deployFixture(){
        const [owner,user] = await ethers.getSigners();
        const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
        const simpleStorage = await SimpleStorage.deploy();
        await simpleStorage.waitForDeployment();
            return {
      simpleStorage,
      owner,
      user,
    };
     }
     it("Should allow owner to store a value",async function(){
        const {simpleStorage} = await deployFixture();
        await simpleStorage.store(100);
        expect(
            await simpleStorage.getnumber()
        ).to.equal(100);
     });
     it("Should revert when non-owner tries to store", async function () {
        const {simpleStorage,user} = await deployFixture();
        await expect(simpleStorage.connect(user).store(100)).to.be.revertedWith("Only owner can call this function")
     });
       it("Should emit NumberStored event", async function () {

    const { simpleStorage } = await deployFixture();

    await expect(
      simpleStorage.store(200)
    )
      .to.emit(simpleStorage, "NumberStored")
      .withArgs(200);

  });

});