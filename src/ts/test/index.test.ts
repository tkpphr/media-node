import { MediaNode } from "../main/index";

describe("Test",()=>{
    class SampleMediaNode extends MediaNode<SampleMediaNode>{
        async getImage(){
            return new Promise<any>(resolve=>resolve());
        }

        async getSound(){
            return new Promise<any>(resolve=>resolve());
        }
    }

    const root=new SampleMediaNode("root");
    const child1=new SampleMediaNode("child1",root);
    const child2=new SampleMediaNode("child2",root);
    root.addChild(child1);
    root.addChild(child2);
    root.addChild(new SampleMediaNode("child3",root));
    root.addChild(new SampleMediaNode("child4",root));
    child1.addChild(new SampleMediaNode("grand_child1",child1));
    child1.addChild(new SampleMediaNode("grand_child2",child1));
    child2.addChild(new SampleMediaNode("grand_child3",child2));
    it("fullPathTest",()=>{
        expect(root.getFullPath()).toBe("root");
        expect(child1.getFullPath()).toBe("root\\child1");
        expect(child2.getChild(0).getFullPath()).toBe("root\\child2\\grand_child3");
    });
    it("findTest",()=>{
        const grandChild1=root.find("root\\child1\\grand_child1");
        expect(grandChild1).toBeDefined();
        expect(child1.getChild(0)).toBe(grandChild1);
    });
    it("findAllTest",()=>{
        expect(root.findAll(node=>node.nodeName.indexOf("child")!==-1).length).toBe(7);
    });
});