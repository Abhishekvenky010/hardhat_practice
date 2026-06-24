import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.create();
describe("MyToken",function(){
    async function deployfixture() {
        const [owner, user] = await ethers.getSigners();
        const MyToken = await ethers.getContractFactory("MyToken");
        const token = await MyToken.deploy();
        await token.waitForDeployment();
        return { token, owner, user };
    };
      it("Should assign initial supply to deployer", async function () {

    const { token, owner } = await deployfixture();

    expect(
      await token.totalSupply()
    ).to.equal(1000);

    expect(
      await token.balanceOf(owner.address)
    ).to.equal(1000);

  });
    it("Should transfer tokens", async function () {

    const { token, owner, user } =
      await deployfixture();

    await token.transfer(
      user.address,
      100
    );

    expect(
      await token.balanceOf(owner.address)
    ).to.equal(900);

    expect(
      await token.balanceOf(user.address)
    ).to.equal(100);

  });

    it("Should approve allowance", async function () {

    const { token, owner, user } =
      await deployfixture();

    await token.approve(
      user.address,
      500
    );

    expect(
      await token.allowance(
        owner.address,
        user.address
      )
    ).to.equal(500);

  });

  it("Should transferFrom using allowance", async function () {

    const { token, owner, user } =
      await deployfixture();

    await token.approve(
      user.address,
      500
    );

    await token
      .connect(user)
      .transferFrom(
        owner.address,
        user.address,
        200
      );

    expect(
      await token.balanceOf(owner.address)
    ).to.equal(800);

    expect(
      await token.balanceOf(user.address)
    ).to.equal(200);

    expect(
      await token.allowance(
        owner.address,
        user.address
      )
    ).to.equal(300);

  });

  it("Should fail if allowance is insufficient", async function () {

    const { token, owner, user } =
      await deployfixture();

    await expect(
      token
        .connect(user)
        .transferFrom(
          owner.address,
          user.address,
          100
        )
    ).to.be.reverted;

  });
})

  