import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.js';
import Media from '../models/Media.js';

const uploadBuffer = (fileBuffer) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    {
      folder: 'onehour-challenge/transformations',
      resource_type: 'auto',
    },
    (error, result) => {
      if (error) reject(error);
      else resolve(result);
    },
  );

  Readable.from(fileBuffer).pipe(stream);
});

const getMediaResourceType = (type) => (type === 'video' ? 'video' : 'image');

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'A media file is required' });
    }

    const result = await uploadBuffer(req.file.buffer);
    const type = result.resource_type === 'video' ? 'video' : 'image';
    const thumbnailUrl = type === 'video'
      ? cloudinary.url(result.public_id, {
        resource_type: 'video',
        format: 'jpg',
        transformation: [{ start_offset: '1' }],
      })
      : null;

    const media = await Media.create({
      type,
      url: result.secure_url,
      publicId: result.public_id,
      thumbnailUrl,
      caption: req.body.caption || '',
      displayOrder: Number(req.body.displayOrder || 0),
    });

    return res.status(201).json({ success: true, data: media, media, message: 'Media uploaded' });
  } catch (error) {
    console.error('Upload media error:', error);
    return res.status(500).json({ success: false, message: 'Failed to upload media' });
  }
};

export const getPublicMedia = async (req, res) => {
  try {
    const filter = {};
    if (['image', 'video'].includes(req.query.type)) {
      filter.type = req.query.type;
    }

    const media = await Media.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    return res.json({ success: true, data: media, media });
  } catch (error) {
    console.error('Get media error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch media' });
  }
};

export const getAdminMedia = async (_req, res) => {
  try {
    const media = await Media.find().sort({ type: 1, displayOrder: 1, createdAt: -1 });
    return res.json({ success: true, data: media, media });
  } catch (error) {
    console.error('Get admin media error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch admin media' });
  }
};

export const updateMediaOrder = async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(
      req.params.id,
      { displayOrder: Number(req.body.displayOrder || 0) },
      { new: true },
    );

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    return res.json({ success: true, data: media, media, message: 'Media order updated' });
  } catch (error) {
    console.error('Update media order error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update media order' });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: getMediaResourceType(media.type),
    });
    await Media.findByIdAndDelete(media._id);

    return res.json({ success: true, message: 'Media deleted' });
  } catch (error) {
    console.error('Delete media error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete media' });
  }
};
