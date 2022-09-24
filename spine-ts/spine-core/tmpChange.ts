using UnityEngine;
using System.Collections;
using Spine.Unity;

public class ChangeSkin : MonoBehaviour {

	private SkeletonAnimation anim;
	public Texture2D t;
	public Texture2D t2;

	// Use this for initialization
	IEnumerator Start () {
		anim = GetComponent<SkeletonAnimation>();

		yield return new WaitForSeconds(0.2f);

		Material m = CreateMeshAttachmentByTexture(anim.skeleton.FindSlot("body"),t2);
		//换下一张图片，如果是动态加载的图片，需要消除之前的DestroyImmediate(m.mainTexture,false);
		m.mainTexture = t;
	}

	/// <summary>
	/// Creates the region attachment by texture.
	/// </summary>
	/// <returns>The region attachment by texture.</returns>
	/// <param name="slot">Slot.</param>
	/// <param name="texture">Texture.</param>
	public Material CreateRegionAttachmentByTexture(Spine.Slot slot, Texture2D texture)
	{
		if(slot==null) return null;

		Spine.RegionAttachment oldAtt = slot.Attachment as Spine.RegionAttachment;
		if(oldAtt==null || texture==null) return null;

		Spine.RegionAttachment att = new Spine.RegionAttachment(oldAtt.Name);
		att.RendererObject = CreateRegion(texture);
		att.Width = oldAtt.Width;
		att.Height = oldAtt.Height;
		att.offset = oldAtt.offset;
		att.Path = oldAtt.Path;
	
		att.X = oldAtt.X;
		att.y = oldAtt.Y;
		att.Rotation = oldAtt.Rotation;
		att.ScaleX = oldAtt.ScaleX;
		att.ScaleY = oldAtt.ScaleY;

		att.SetUVs(0f,1f,1f,0f,false);

		Material mat = new Material(Shader.Find("Sprites/Default"));
		mat.mainTexture = texture;
		(att.RendererObject as Spine.AtlasRegion).page.rendererObject = mat;

		slot.Attachment = att;
		return mat;
	}

	/// <summary>
	/// Creates the mesh attachment by texture.
	/// </summary>
	/// <returns>The mesh attachment by texture.</returns>
	/// <param name="slot">Slot.</param>
	/// <param name="texture">Texture.</param>
	public Material CreateMeshAttachmentByTexture(Spine.Slot slot, Texture2D texture)
	{
		if(slot==null) return null;
		Spine.MeshAttachment oldAtt = slot.Attachment as Spine.MeshAttachment;
		if(oldAtt==null || texture==null) return null;

		Spine.MeshAttachment att = new Spine.MeshAttachment(oldAtt.Name);
		att.RendererObject = CreateRegion(texture);
		att.Path = oldAtt.Path;

		att.Bones = oldAtt.Bones;
		att.Edges = oldAtt.Edges;
		att.Triangles = oldAtt.triangles;
		att.Vertices = oldAtt.Vertices;
		att.WorldVerticesLength = oldAtt.WorldVerticesLength;
		att.HullLength = oldAtt.HullLength;
		att.RegionRotate = false;

		att.RegionU = 0f;
		att.RegionV = 1f;
		att.RegionU2 = 1f;
		att.RegionV2 = 0f;
		att.RegionUVs = oldAtt.RegionUVs;

		att.UpdateUVs();

		Material mat = new Material(Shader.Find("Sprites/Default"));
		mat.mainTexture = texture;
		(att.RendererObject as Spine.AtlasRegion).page.rendererObject = mat;

		slot.Attachment = att;
		return mat;
	}



	private Spine.AtlasRegion CreateRegion(Texture2D texture){

		Spine.AtlasRegion region = new Spine.AtlasRegion();
		region.width = texture.width;
		region.height = texture.height;
		region.originalWidth = texture.width;
		region.originalHeight = texture.height;
		region.rotate = false;
		region.page = new Spine.AtlasPage();
		region.page.name = texture.name;
		region.page.width = texture.width;
		region.page.height = texture.height;
		region.page.uWrap = Spine.TextureWrap.ClampToEdge;
		region.page.vWrap = Spine.TextureWrap.ClampToEdge;

		return region;
	}

}
